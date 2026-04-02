import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";

import {
	buildJobberAuthorizeUrl,
	isJobberSetupRequestAuthorized,
	JOBBER_OAUTH_STATE_COOKIE,
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

	try {
		const state = randomUUID();
		const authorizeUrl = buildJobberAuthorizeUrl(request.nextUrl.origin, state);

		const response = NextResponse.redirect(authorizeUrl, { status: 302 });
		response.cookies.set({
			name: JOBBER_OAUTH_STATE_COOKIE,
			value: state,
			httpOnly: true,
			sameSite: "lax",
			secure: request.nextUrl.protocol === "https:",
			path: "/",
			maxAge: 60 * 15,
		});
		response.headers.set("Cache-Control", "no-store");

		return response;
	} catch (error) {
		return NextResponse.json(
			{
				success: false,
				message:
					error instanceof Error
						? error.message
						: "Unable to start the Jobber OAuth flow.",
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
