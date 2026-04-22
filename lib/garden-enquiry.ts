import { JourneyStage, ProjectType, SubmittedFormData } from "@/lib/types";

const PROJECT_TYPES: ProjectType[] = [
	"full-landscaping",
	"planters-pergolas",
	"garden-design",
	"patio-paving",
	"fencing",
	"driveway",
	"garden-room",
];

const JOURNEY_STAGES: JourneyStage[] = [
	"planning",
	"only-quote",
	"multiple-quotes",
	"ready",
];

const PROJECT_TYPE_LABELS: Record<ProjectType, string> = {
	"full-landscaping": "Full Garden Landscaping",
	"planters-pergolas": "Planters & Pergolas",
	"garden-design": "Garden Design Service",
	"patio-paving": "Patio or Paving",
	fencing: "Fencing",
	driveway: "Driveway",
	"garden-room": "Garden Room",
};

const JOURNEY_STAGE_LABELS: Record<JourneyStage, string> = {
	planning: "I'm still planning and researching",
	"only-quote": "This is the only quote I'm getting",
	"multiple-quotes": "I've already received a few quotes",
	ready: "I'm ready to get started",
};

export class FormValidationError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "FormValidationError";
	}
}

export function formatProjectType(type: ProjectType | string): string {
	return PROJECT_TYPE_LABELS[type as ProjectType] ?? type;
}

export function formatJourneyStage(stage: JourneyStage | string): string {
	return JOURNEY_STAGE_LABELS[stage as JourneyStage] ?? stage;
}

export function parseSubmittedFormData(input: unknown): SubmittedFormData {
	if (!input || typeof input !== "object") {
		throw new FormValidationError("Invalid form submission.");
	}

	const formData = input as Record<string, unknown>;
	const projectType = requireProjectType(formData.projectType);
	const journeyStage = requireJourneyStage(formData.journeyStage);

	const email = requireText(formData.email, "Email", 320).toLowerCase();
	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
		throw new FormValidationError("Please enter a valid email address.");
	}

	return {
		projectType,
		journeyStage,
		name: requireText(formData.name, "Name", 120),
		phone: requireText(formData.phone, "Phone number", 40),
		email,
		address: requireText(formData.address, "Address", 300),
		postcode: requireText(formData.postcode, "Postcode", 20).toUpperCase(),
	};
}

export function escapeHtml(value: string): string {
	return value
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll('"', "&quot;")
		.replaceAll("'", "&#39;");
}

export function normalizeEmail(value: string): string {
	return value.trim().toLowerCase();
}

export function normalizePhone(value: string): string {
	return value.replace(/[^\d+]/g, "");
}

export function splitFullName(name: string): { firstName: string; lastName: string } {
	const parts = name.trim().split(/\s+/).filter(Boolean);
	if (parts.length === 0) {
		return { firstName: "", lastName: "" };
	}
	if (parts.length === 1) {
		return { firstName: parts[0], lastName: "" };
	}

	return {
		firstName: parts.slice(0, -1).join(" "),
		lastName: parts.at(-1) ?? "",
	};
}

function requireText(value: unknown, label: string, maxLength: number): string {
	if (typeof value !== "string") {
		throw new FormValidationError(`${label} is required.`);
	}

	const normalized = value.replace(/\s+/g, " ").trim();
	if (!normalized) {
		throw new FormValidationError(`${label} is required.`);
	}
	if (normalized.length > maxLength) {
		throw new FormValidationError(`${label} is too long.`);
	}

	return normalized;
}

function requireProjectType(value: unknown): ProjectType {
	if (typeof value !== "string" || !PROJECT_TYPES.includes(value as ProjectType)) {
		throw new FormValidationError("Please choose a project type.");
	}

	return value as ProjectType;
}

function requireJourneyStage(value: unknown): JourneyStage {
	if (
		typeof value !== "string" ||
		!JOURNEY_STAGES.includes(value as JourneyStage)
	) {
		throw new FormValidationError("Please choose a journey stage.");
	}

	return value as JourneyStage;
}
