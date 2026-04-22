import "server-only";

import { SubmittedFormData } from "@/lib/types";
import {
	formatJourneyStage,
	formatProjectType,
	normalizeEmail,
	splitFullName,
} from "@/lib/garden-enquiry";

const JOBBER_API_BASE_URL = "https://api.getjobber.com";
const JOBBER_OAUTH_TOKEN_URL = `${JOBBER_API_BASE_URL}/api/oauth/token`;
const JOBBER_GRAPHQL_URL = `${JOBBER_API_BASE_URL}/api/graphql`;
const DEFAULT_JOBBER_API_VERSION = "2025-04-16";
const CLIENTS_PAGE_SIZE = 50;
const CLIENTS_PAGE_LIMIT = 20;

const PLACEHOLDER_ENV_VALUES = new Set([
	"your_long_lived_refresh_token",
	"your_jobber_client_id",
	"your_jobber_client_secret",
	"choose_a_long_random_secret",
]);

const CUSTOM_FIELD_DEFINITIONS = [
	{
		key: "address",
		name: "Website Address",
		getValue: (formData: SubmittedFormData) => formData.address,
	},
	{
		key: "postcode",
		name: "Website Postcode",
		getValue: (formData: SubmittedFormData) => formData.postcode,
	},
	{
		key: "projectType",
		name: "Website Project Type",
		getValue: (formData: SubmittedFormData) => formatProjectType(formData.projectType),
	},
	{
		key: "journeyStage",
		name: "Website Journey Stage",
		getValue: (formData: SubmittedFormData) => formatJourneyStage(formData.journeyStage),
	},
] as const;

export const JOBBER_OAUTH_STATE_COOKIE = "jobber_oauth_state";

type JobberCustomFieldKey = (typeof CUSTOM_FIELD_DEFINITIONS)[number]["key"];

type JobberConfig = {
	enabled: boolean;
	clientId: string | null;
	clientSecret: string | null;
	refreshToken: string | null;
	apiVersion: string;
	setupSecret: string | null;
};

type JobberTokenResponse = {
	access_token: string;
	refresh_token: string;
	expires_at?: string;
	warning?: string;
};

type JobberGraphqlResponse<TData> = {
	data?: TData;
	errors?: Array<{ message: string }>;
	extensions?: {
		versioning?: {
			version?: string;
			warning?: string;
		};
	};
};

type JobberGraphqlResult<TData> = {
	data: TData;
	version?: string;
	versionWarning?: string;
};

type JobberUserError = {
	message: string;
	path?: string[] | null;
};

type JobberAccountSummary = {
	accountId: string;
	accountName: string;
	apiVersion: string;
	versionWarning?: string;
	tokenWarning?: string;
};

type JobberClientSummary = {
	id: string;
	firstName: string;
	lastName: string;
	defaultEmails: string[];
};

type JobberCustomFieldConfig = {
	id: string;
	name: string;
	appliesTo: string;
	valueType: string;
};

type JobberCustomFieldIdMap = Record<JobberCustomFieldKey, string>;

type JobberSyncResult = {
	action: "created" | "updated" | "skipped";
	clientId?: string;
	clientName?: string;
	jobberWebUri?: string;
	warnings: string[];
};

type UpsertVariant = {
	includePhone: boolean;
	includeCustomFields: boolean;
};

export function getJobberConfigStatus() {
	const config = getJobberConfig();

	return {
		enabled: config.enabled,
		apiVersion: config.apiVersion,
		clientIdConfigured: hasConfiguredEnvValue(config.clientId),
		clientSecretConfigured: hasConfiguredEnvValue(config.clientSecret),
		refreshTokenConfigured: hasConfiguredEnvValue(config.refreshToken),
		setupSecretConfigured: hasConfiguredEnvValue(config.setupSecret),
		readyForOAuth:
			config.enabled &&
			hasConfiguredEnvValue(config.clientId) &&
			hasConfiguredEnvValue(config.clientSecret) &&
			hasConfiguredEnvValue(config.setupSecret),
		readyForSync:
			config.enabled &&
			hasConfiguredEnvValue(config.clientId) &&
			hasConfiguredEnvValue(config.clientSecret) &&
			hasConfiguredEnvValue(config.refreshToken),
	};
}

export function isJobberSetupRequestAuthorized(secret: string | null): boolean {
	const config = getJobberConfig();
	return hasConfiguredEnvValue(config.setupSecret) && secret === config.setupSecret;
}

export function getJobberCallbackUrl(origin: string): string {
	return `${origin}/api/jobber/oauth/callback`;
}

export function buildJobberAuthorizeUrl(origin: string, state: string): string {
	const config = getJobberConfig();
	if (!config.enabled) {
		throw new Error("Jobber sync is disabled.");
	}
	if (!hasConfiguredEnvValue(config.clientId) || !hasConfiguredEnvValue(config.clientSecret)) {
		throw new Error("Jobber client credentials are missing.");
	}

	const params = new URLSearchParams({
		response_type: "code",
		client_id: config.clientId!,
		redirect_uri: getJobberCallbackUrl(origin),
		state,
	});

	return `${JOBBER_API_BASE_URL}/api/oauth/authorize?${params.toString()}`;
}

export async function exchangeJobberAuthorizationCode(
	code: string,
	redirectUri: string,
): Promise<JobberTokenResponse> {
	const config = getJobberConfig();
	if (!hasConfiguredEnvValue(config.clientId) || !hasConfiguredEnvValue(config.clientSecret)) {
		throw new Error("Jobber client credentials are missing.");
	}

	return requestJobberTokens(
		new URLSearchParams({
			client_id: config.clientId!,
			client_secret: config.clientSecret!,
			grant_type: "authorization_code",
			code,
			redirect_uri: redirectUri,
		}),
	);
}

export async function getJobberConnectionStatus(): Promise<JobberAccountSummary> {
	const tokenResponse = await refreshJobberAccessToken();
	const accountSummary = await getJobberAccountSummary(tokenResponse.access_token);

	return {
		...accountSummary,
		tokenWarning: tokenResponse.warning,
	};
}

export async function syncGardenEnquiryToJobber(
	formData: SubmittedFormData,
): Promise<JobberSyncResult> {
	const warnings: string[] = [];
	const tokenResponse = await refreshJobberAccessToken();

	if (tokenResponse.warning) {
		warnings.push(tokenResponse.warning);
	}

	const accessToken = tokenResponse.access_token;
	const accountSummary = await getJobberAccountSummary(accessToken);
	if (accountSummary.versionWarning) {
		warnings.push(accountSummary.versionWarning);
	}

	let customFieldIds: JobberCustomFieldIdMap | null = null;
	try {
		customFieldIds = await ensureClientCustomFields(accessToken);
	} catch (error) {
		warnings.push(
			`Jobber custom fields were skipped: ${getErrorMessage(error)}`,
		);
	}

	const matchingClients = await findClientsByEmail(accessToken, formData.email);
	if (matchingClients.length > 1) {
		warnings.push(
			`Multiple Jobber clients already match ${formData.email}. Sync was skipped to avoid creating ambiguity.`,
		);

		return {
			action: "skipped",
			warnings,
		};
	}

	const existingClient = matchingClients[0];
	const upsertResult = await upsertClient(accessToken, formData, existingClient?.id, customFieldIds);

	return {
		action: existingClient ? "updated" : "created",
		clientId: upsertResult.id,
		clientName: upsertResult.name,
		jobberWebUri: upsertResult.jobberWebUri,
		warnings,
	};
}

async function refreshJobberAccessToken(
	overrideRefreshToken?: string,
): Promise<JobberTokenResponse> {
	const config = getJobberConfig();
	if (!config.enabled) {
		throw new Error("Jobber sync is disabled.");
	}
	if (!hasConfiguredEnvValue(config.clientId) || !hasConfiguredEnvValue(config.clientSecret)) {
		throw new Error("Jobber client credentials are missing.");
	}

	const refreshToken = overrideRefreshToken ?? config.refreshToken;
	if (!hasConfiguredEnvValue(refreshToken)) {
		throw new Error(
			"JOBBER_REFRESH_TOKEN is missing. Complete the OAuth flow first to get a refresh token.",
		);
	}

	return requestJobberTokens(
		new URLSearchParams({
			client_id: config.clientId!,
			client_secret: config.clientSecret!,
			grant_type: "refresh_token",
			refresh_token: refreshToken!,
		}),
	);
}

async function requestJobberTokens(
	formBody: URLSearchParams,
): Promise<JobberTokenResponse> {
	const response = await fetch(JOBBER_OAUTH_TOKEN_URL, {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: formBody.toString(),
		cache: "no-store",
	});

	const payload = await parseJsonResponse<JobberTokenResponse>(response);

	if (!response.ok) {
		throw new Error(
			payload instanceof Error
				? payload.message
				: `Jobber token request failed with status ${response.status}.`,
		);
	}

	if (payload instanceof Error) {
		throw payload;
	}

	if (!payload.access_token || !payload.refresh_token) {
		throw new Error("Jobber token response did not include the expected tokens.");
	}

	return payload;
}

async function getJobberAccountSummary(
	accessToken: string,
): Promise<JobberAccountSummary> {
	const result = await jobberGraphql<{ account: { id: string; name: string } }>(
		accessToken,
		`
			query AccountSummary {
				account {
					id
					name
				}
			}
		`,
	);

	return {
		accountId: result.data.account.id,
		accountName: result.data.account.name,
		apiVersion: result.version ?? getJobberConfig().apiVersion,
		versionWarning: result.versionWarning,
	};
}

async function findClientsByEmail(
	accessToken: string,
	email: string,
): Promise<JobberClientSummary[]> {
	const normalizedEmail = normalizeEmail(email);
	const matches: JobberClientSummary[] = [];

	let afterCursor: string | null = null;
	let pageCount = 0;

	do {
		const result: JobberGraphqlResult<{
			clients: {
				nodes: JobberClientSummary[];
				pageInfo: {
					endCursor: string | null;
					hasNextPage: boolean;
				};
			};
		}> = await jobberGraphql<{
			clients: {
				nodes: JobberClientSummary[];
				pageInfo: {
					endCursor: string | null;
					hasNextPage: boolean;
				};
			};
		}>(
			accessToken,
			`
				query FindClientsByEmail($first: Int!, $after: String) {
					clients(first: $first, after: $after) {
						nodes {
							id
							firstName
							lastName
							defaultEmails
						}
						pageInfo {
							endCursor
							hasNextPage
						}
					}
				}
			`,
			{
				first: CLIENTS_PAGE_SIZE,
				after: afterCursor,
			},
		);

		for (const client of result.data.clients.nodes) {
			const hasMatchingEmail = client.defaultEmails.some(
				(candidate: string) => normalizeEmail(candidate) === normalizedEmail,
			);
			if (hasMatchingEmail) {
				matches.push(client);
			}
		}

		pageCount += 1;
		if (
			!result.data.clients.pageInfo.hasNextPage ||
			pageCount >= CLIENTS_PAGE_LIMIT ||
			matches.length > 1
		) {
			break;
		}

		afterCursor = result.data.clients.pageInfo.endCursor;
	} while (afterCursor);

	return matches;
}

async function ensureClientCustomFields(
	accessToken: string,
): Promise<JobberCustomFieldIdMap> {
	const existingConfigurations = await listCustomFieldConfigurations(accessToken);
	const customFieldIds = {} as JobberCustomFieldIdMap;

	for (const definition of CUSTOM_FIELD_DEFINITIONS) {
		const existingConfiguration = existingConfigurations.find(
			(configuration) =>
				configuration.name === definition.name &&
				configuration.appliesTo === "ALL_CLIENTS" &&
				configuration.valueType === "TEXT",
		);

		if (existingConfiguration) {
			customFieldIds[definition.key] = existingConfiguration.id;
			continue;
		}

		const createdConfiguration = await createTextCustomField(accessToken, definition.name);
		customFieldIds[definition.key] = createdConfiguration.id;
	}

	return customFieldIds;
}

async function listCustomFieldConfigurations(
	accessToken: string,
): Promise<JobberCustomFieldConfig[]> {
	const result = await jobberGraphql<{
		customFieldConfigurations: {
			nodes: JobberCustomFieldConfig[];
		};
	}>(
		accessToken,
		`
			query ListCustomFieldConfigurations {
				customFieldConfigurations(first: 50) {
					nodes {
						... on CustomFieldConfigurationArea {
							id
							name
							appliesTo
							valueType
						}
						... on CustomFieldConfigurationDropdown {
							id
							name
							appliesTo
							valueType
						}
						... on CustomFieldConfigurationLink {
							id
							name
							appliesTo
							valueType
						}
						... on CustomFieldConfigurationNumeric {
							id
							name
							appliesTo
							valueType
						}
						... on CustomFieldConfigurationText {
							id
							name
							appliesTo
							valueType
						}
						... on CustomFieldConfigurationTrueFalse {
							id
							name
							appliesTo
							valueType
						}
					}
				}
			}
		`,
	);

	return result.data.customFieldConfigurations.nodes;
}

async function createTextCustomField(
	accessToken: string,
	name: string,
): Promise<Pick<JobberCustomFieldConfig, "id" | "name">> {
	const result = await jobberGraphql<{
		customFieldConfigurationCreateText: {
			customFieldConfiguration: {
				id: string;
				name: string;
			} | null;
			userErrors: JobberUserError[];
		};
	}>(
		accessToken,
		`
			mutation CreateTextCustomField($name: String!) {
				customFieldConfigurationCreateText(
					input: {
						appliesTo: ALL_CLIENTS
						name: $name
						transferable: false
						readOnly: false
					}
				) {
					customFieldConfiguration {
						id
						name
					}
					userErrors {
						message
						path
					}
				}
			}
		`,
		{ name },
	);

	const payload = result.data.customFieldConfigurationCreateText;
	assertNoUserErrors(payload.userErrors, `creating custom field "${name}"`);

	if (!payload.customFieldConfiguration) {
		throw new Error(`Jobber did not return the created custom field for "${name}".`);
	}

	return payload.customFieldConfiguration;
}

async function upsertClient(
	accessToken: string,
	formData: SubmittedFormData,
	existingClientId: string | undefined,
	customFieldIds: JobberCustomFieldIdMap | null,
): Promise<{ id: string; name: string; jobberWebUri?: string }> {
	const variants = buildUpsertVariants(Boolean(customFieldIds));
	let lastError: Error | null = null;

	for (const variant of variants) {
		try {
			return await executeUpsertVariant(
				accessToken,
				formData,
				existingClientId,
				customFieldIds,
				variant,
			);
		} catch (error) {
			lastError = ensureError(error);
		}
	}

	throw lastError ?? new Error("Unable to create or update the Jobber client.");
}

async function executeUpsertVariant(
	accessToken: string,
	formData: SubmittedFormData,
	existingClientId: string | undefined,
	customFieldIds: JobberCustomFieldIdMap | null,
	variant: UpsertVariant,
): Promise<{ id: string; name: string; jobberWebUri?: string }> {
	if (variant.includeCustomFields && !customFieldIds) {
		throw new Error("Custom fields are not available for this sync attempt.");
	}

	const mutation = buildClientMutation(Boolean(existingClientId), variant);
	const variables = buildClientMutationVariables(
		formData,
		existingClientId,
		customFieldIds,
		variant,
	);

	if (existingClientId) {
		const result = await jobberGraphql<{
			clientEdit: {
				client: {
					id: string;
					name: string;
					jobberWebUri?: string | null;
				} | null;
				userErrors: JobberUserError[];
			};
		}>(accessToken, mutation, variables);

		const payload = result.data.clientEdit;
		assertNoUserErrors(payload.userErrors, "updating the Jobber client");

		if (!payload.client) {
			throw new Error("Jobber did not return the updated client.");
		}

		return {
			id: payload.client.id,
			name: payload.client.name,
			jobberWebUri: payload.client.jobberWebUri ?? undefined,
		};
	}

	const result = await jobberGraphql<{
		clientCreate: {
			client: {
				id: string;
				name: string;
				jobberWebUri?: string | null;
			} | null;
			userErrors: JobberUserError[];
		};
	}>(accessToken, mutation, variables);

	const payload = result.data.clientCreate;
	assertNoUserErrors(payload.userErrors, "creating the Jobber client");

	if (!payload.client) {
		throw new Error("Jobber did not return the created client.");
	}

	return {
		id: payload.client.id,
		name: payload.client.name,
		jobberWebUri: payload.client.jobberWebUri ?? undefined,
	};
}

function buildUpsertVariants(includeCustomFields: boolean): UpsertVariant[] {
	const variants: UpsertVariant[] = [
		{ includePhone: true, includeCustomFields },
		{ includePhone: false, includeCustomFields },
		{ includePhone: true, includeCustomFields: false },
		{ includePhone: false, includeCustomFields: false },
	];

	return variants.filter(
		(variant, index) =>
			variants.findIndex(
				(candidate) =>
					candidate.includePhone === variant.includePhone &&
					candidate.includeCustomFields === variant.includeCustomFields,
			) === index,
	);
}

function buildClientMutation(isEdit: boolean, variant: UpsertVariant): string {
	const variableDefinitions = [
		isEdit ? "$clientId: EncodedId!" : null,
		"$firstName: String!",
		"$lastName: String!",
		"$email: String!",
		variant.includePhone ? "$phone: String!" : null,
		variant.includeCustomFields ? "$addressFieldId: EncodedId!" : null,
		variant.includeCustomFields ? "$postcodeFieldId: EncodedId!" : null,
		variant.includeCustomFields ? "$projectTypeFieldId: EncodedId!" : null,
		variant.includeCustomFields ? "$journeyStageFieldId: EncodedId!" : null,
		variant.includeCustomFields ? "$address: String!" : null,
		variant.includeCustomFields ? "$postcode: String!" : null,
		variant.includeCustomFields ? "$projectType: String!" : null,
		variant.includeCustomFields ? "$journeyStage: String!" : null,
	]
		.filter(Boolean)
		.join(", ");

	const inputLines = [
		"firstName: $firstName",
		"lastName: $lastName",
		'emails: [{ description: MAIN, primary: true, address: $email }]',
		variant.includePhone
			? 'phones: [{ description: MAIN, primary: true, number: $phone }]'
			: null,
		variant.includeCustomFields
			? `customFields: [
				{ customFieldConfigurationId: $addressFieldId, valueText: $address }
				{ customFieldConfigurationId: $postcodeFieldId, valueText: $postcode }
				{ customFieldConfigurationId: $projectTypeFieldId, valueText: $projectType }
				{ customFieldConfigurationId: $journeyStageFieldId, valueText: $journeyStage }
			]`
			: null,
	]
		.filter(Boolean)
		.join("\n\t\t\t\t\t\t");

	if (isEdit) {
		return `
			mutation EditClient(${variableDefinitions}) {
				clientEdit(
					clientId: $clientId
					input: {
						${inputLines}
					}
				) {
					client {
						id
						name
						jobberWebUri
					}
					userErrors {
						message
						path
					}
				}
			}
		`;
	}

	return `
		mutation CreateClient(${variableDefinitions}) {
			clientCreate(
				input: {
					${inputLines}
				}
			) {
				client {
					id
					name
					jobberWebUri
				}
				userErrors {
					message
					path
				}
			}
		}
	`;
}

function buildClientMutationVariables(
	formData: SubmittedFormData,
	existingClientId: string | undefined,
	customFieldIds: JobberCustomFieldIdMap | null,
	variant: UpsertVariant,
): Record<string, string> {
	const { firstName, lastName } = splitFullName(formData.name);
	const variables: Record<string, string> = {
		firstName: firstName || formData.name,
		lastName,
		email: normalizeEmail(formData.email),
	};

	if (existingClientId) {
		variables.clientId = existingClientId;
	}

	if (variant.includePhone) {
		variables.phone = formData.phone;
	}

	if (variant.includeCustomFields && customFieldIds) {
		variables.addressFieldId = customFieldIds.address;
		variables.postcodeFieldId = customFieldIds.postcode;
		variables.projectTypeFieldId = customFieldIds.projectType;
		variables.journeyStageFieldId = customFieldIds.journeyStage;
		variables.address = formData.address;
		variables.postcode = formData.postcode;
		variables.projectType = formatProjectType(formData.projectType);
		variables.journeyStage = formatJourneyStage(formData.journeyStage);
	}

	return variables;
}

async function jobberGraphql<TData>(
	accessToken: string,
	query: string,
	variables?: Record<string, unknown>,
): Promise<JobberGraphqlResult<TData>> {
	const config = getJobberConfig();
	const response = await fetch(JOBBER_GRAPHQL_URL, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${accessToken}`,
			"Content-Type": "application/json",
			"X-JOBBER-GRAPHQL-VERSION": config.apiVersion,
		},
		body: JSON.stringify({
			query,
			variables,
		}),
		cache: "no-store",
	});

	const payload = await parseJsonResponse<JobberGraphqlResponse<TData>>(response);

	if (!response.ok) {
		throw new Error(
			payload instanceof Error
				? payload.message
				: `Jobber GraphQL request failed with status ${response.status}.`,
		);
	}

	if (payload instanceof Error) {
		throw payload;
	}

	if (payload.errors?.length) {
		throw new Error(payload.errors.map((error) => error.message).join(" "));
	}

	if (!payload.data) {
		throw new Error("Jobber returned an empty GraphQL response.");
	}

	return {
		data: payload.data,
		version: payload.extensions?.versioning?.version,
		versionWarning: payload.extensions?.versioning?.warning,
	};
}

async function parseJsonResponse<T>(response: Response): Promise<T | Error> {
	const rawBody = await response.text();
	if (!rawBody) {
		return new Error(`Empty response received from Jobber (status ${response.status}).`);
	}

	try {
		return JSON.parse(rawBody) as T;
	} catch {
		return new Error(rawBody);
	}
}

function assertNoUserErrors(userErrors: JobberUserError[], context: string): void {
	if (!userErrors.length) {
		return;
	}

	const message = userErrors
		.map((userError) => {
			const path = userError.path?.length ? ` (${userError.path.join(".")})` : "";
			return `${userError.message}${path}`;
		})
		.join(" ");

	throw new Error(`Jobber reported a problem while ${context}: ${message}`);
}

function getJobberConfig(): JobberConfig {
	return {
		enabled: parseBoolean(process.env.JOBBER_ENABLED),
		clientId: readEnv("JOBBER_CLIENT_ID"),
		clientSecret: readEnv("JOBBER_CLIENT_SECRET"),
		refreshToken: readEnv("JOBBER_REFRESH_TOKEN"),
		apiVersion: readEnv("JOBBER_API_VERSION") ?? DEFAULT_JOBBER_API_VERSION,
		setupSecret: readEnv("JOBBER_SETUP_SECRET"),
	};
}

function parseBoolean(value: string | undefined): boolean {
	if (!value) {
		return false;
	}

	return ["1", "true", "yes", "on"].includes(value.trim().toLowerCase());
}

function readEnv(name: string): string | null {
	const value = process.env[name]?.trim();
	return value ? value : null;
}

function hasConfiguredEnvValue(value: string | null): boolean {
	if (!value) {
		return false;
	}

	const normalized = value.trim().toLowerCase();
	if (!normalized || PLACEHOLDER_ENV_VALUES.has(normalized)) {
		return false;
	}

	return !normalized.startsWith("your_") && !normalized.startsWith("<");
}

function getErrorMessage(error: unknown): string {
	return ensureError(error).message;
}

function ensureError(error: unknown): Error {
	return error instanceof Error ? error : new Error(String(error));
}
