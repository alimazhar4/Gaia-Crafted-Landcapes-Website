import { NextRequest, NextResponse } from "next/server";

import {
	getJobberCallbackUrl,
	getJobberConfigStatus,
	getJobberConnectionStatus,
	isJobberSetupRequestAuthorized,
} from "@/lib/jobber";

export async function GET(request: NextRequest) {
	const secret = request.nextUrl.searchParams.get("secret");
	if (!isJobberSetupRequestAuthorized(secret)) {
		return NextResponse.json(
			{
				success: false,
				message: "Invalid or missing Jobber setup secret.",
			},
			{
				status: 401,
				headers: {
					"Cache-Control": "no-store",
				},
			},
		);
	}

	const config = getJobberConfigStatus();
	const callbackUrl = getJobberCallbackUrl(request.nextUrl.origin);

	if (!config.readyForSync) {
		return NextResponse.json(
			{
				success: false,
				message:
					"Jobber is not ready for sync yet. Complete OAuth and set JOBBER_REFRESH_TOKEN first.",
				config,
				callbackUrl,
			},
			{
				status: 200,
				headers: {
					"Cache-Control": "no-store",
				},
			},
		);
	}

	try {
		const connection = await getJobberConnectionStatus();

		return NextResponse.json(
			{
				success: true,
				config,
				callbackUrl,
				connection,
			},
			{
				status: 200,
				headers: {
					"Cache-Control": "no-store",
				},
			},
		);
	} catch (error) {
		return NextResponse.json(
			{
				success: false,
				message:
					error instanceof Error
						? error.message
						: "Unable to verify the Jobber connection.",
				config,
				callbackUrl,
			},
			{
				status: 500,
				headers: {
					"Cache-Control": "no-store",
				},
			},
		);
	}
}
