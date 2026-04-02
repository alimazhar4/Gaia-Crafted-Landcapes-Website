import { NextRequest, NextResponse } from "next/server";

import {
	exchangeJobberAuthorizationCode,
	getJobberCallbackUrl,
	JOBBER_OAUTH_STATE_COOKIE,
} from "@/lib/jobber";
import { escapeHtml } from "@/lib/garden-enquiry";

export async function GET(request: NextRequest) {
	const responseHeaders = {
		"Content-Type": "text/html; charset=utf-8",
		"Cache-Control": "no-store",
	};

	const state = request.nextUrl.searchParams.get("state");
	const code = request.nextUrl.searchParams.get("code");
	const storedState = request.cookies.get(JOBBER_OAUTH_STATE_COOKIE)?.value;

	if (!code) {
		return clearStateCookie(
			new NextResponse(
				renderErrorPage(
					"Jobber did not return an authorization code.",
					"Restart the setup flow from /api/jobber/oauth/start?secret=YOUR_SETUP_SECRET and approve the app when Jobber prompts you.",
				),
				{ status: 400, headers: responseHeaders },
			),
		);
	}

	if (!state || !storedState || state !== storedState) {
		return clearStateCookie(
			new NextResponse(
				renderErrorPage(
					"The Jobber OAuth state check failed.",
					"Restart the setup flow from /api/jobber/oauth/start?secret=YOUR_SETUP_SECRET so a fresh secure state cookie can be issued.",
				),
				{ status: 400, headers: responseHeaders },
			),
		);
	}

	try {
		const tokenResponse = await exchangeJobberAuthorizationCode(
			code,
			getJobberCallbackUrl(request.nextUrl.origin),
		);

		return clearStateCookie(
			new NextResponse(renderSuccessPage(tokenResponse.refresh_token), {
				status: 200,
				headers: responseHeaders,
			}),
		);
	} catch (error) {
		return clearStateCookie(
			new NextResponse(
				renderErrorPage(
					"Jobber returned an error while exchanging the authorization code.",
					error instanceof Error ? error.message : "Unknown Jobber token exchange error.",
				),
				{ status: 500, headers: responseHeaders },
			),
		);
	}
}

function clearStateCookie(response: NextResponse): NextResponse {
	response.cookies.set({
		name: JOBBER_OAUTH_STATE_COOKIE,
		value: "",
		httpOnly: true,
		sameSite: "lax",
		path: "/",
		maxAge: 0,
	});

	return response;
}

function renderSuccessPage(refreshToken: string): string {
	const escapedToken = escapeHtml(refreshToken);
	const escapedEnvLine = escapeHtml(`JOBBER_REFRESH_TOKEN=${refreshToken}`);

	return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Jobber OAuth Complete</title>
    <style>
      :root {
        color-scheme: light;
      }
      * {
        box-sizing: border-box;
      }
      body {
        margin: 0;
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        background: linear-gradient(180deg, #41273b 0%, #2a1925 100%);
        color: #1c1c1c;
      }
      main {
        min-height: 100vh;
        display: grid;
        place-items: center;
        padding: 24px;
      }
      .card {
        width: min(760px, 100%);
        background: #ffffff;
        border-radius: 24px;
        padding: 32px;
        box-shadow: 0 30px 80px rgba(0, 0, 0, 0.28);
      }
      h1 {
        margin: 0 0 12px;
        color: #41273b;
        font-size: 2rem;
      }
      p {
        margin: 0 0 16px;
        line-height: 1.6;
      }
      .callout {
        margin: 24px 0;
        padding: 18px 20px;
        border-radius: 16px;
        background: #f7f1d8;
        border: 1px solid #dcc47a;
      }
      .token {
        margin: 20px 0 12px;
        padding: 16px;
        border-radius: 16px;
        background: #f5f6f8;
        border: 1px solid #d6d7dc;
        font-family: Consolas, "Courier New", monospace;
        word-break: break-all;
        font-size: 0.95rem;
      }
      .actions {
        display: flex;
        gap: 12px;
        flex-wrap: wrap;
        margin: 20px 0 28px;
      }
      button {
        border: 0;
        border-radius: 999px;
        padding: 12px 18px;
        cursor: pointer;
        font: inherit;
        font-weight: 600;
      }
      .primary {
        background: #41273b;
        color: #ffffff;
      }
      .secondary {
        background: #c5d0c6;
        color: #2a1925;
      }
      code {
        font-family: Consolas, "Courier New", monospace;
      }
      ol {
        margin: 0;
        padding-left: 20px;
      }
      li + li {
        margin-top: 8px;
      }
      .small {
        color: #5e5e66;
        font-size: 0.95rem;
      }
    </style>
  </head>
  <body>
    <main>
      <section class="card">
        <h1>Jobber authorization complete</h1>
        <p>Your app has returned a refresh token successfully. This token is sensitive, so keep it server-side only.</p>
        <div class="callout">
          Refresh token rotation should stay <strong>OFF</strong> for this private setup. With rotation off, this token should remain stable when you refresh access tokens.
        </div>
        <p>Paste this value into your server environment as <code>JOBBER_REFRESH_TOKEN</code>:</p>
        <div id="refresh-token" class="token">${escapedToken}</div>
        <div class="actions">
          <button class="primary" id="copy-token">Copy Refresh Token</button>
          <button class="secondary" id="copy-env">Copy ENV Line</button>
        </div>
        <p class="small">ENV line:</p>
        <div id="env-line" class="token">${escapedEnvLine}</div>
        <p>Next steps:</p>
        <ol>
          <li>Update <code>.env</code> so <code>JOBBER_REFRESH_TOKEN</code> uses this value.</li>
          <li>Restart the Next.js dev server so the new server env is loaded.</li>
          <li>Open <code>/api/jobber/status?secret=YOUR_SETUP_SECRET</code> to confirm Jobber is connected.</li>
          <li>Submit the garden enquiry form and confirm the emails still send and a Jobber client is created or updated.</li>
        </ol>
      </section>
    </main>
    <script>
      const copy = async (value) => {
        await navigator.clipboard.writeText(value);
      };

      document.getElementById("copy-token")?.addEventListener("click", async () => {
        await copy(document.getElementById("refresh-token")?.textContent ?? "");
      });

      document.getElementById("copy-env")?.addEventListener("click", async () => {
        await copy(document.getElementById("env-line")?.textContent ?? "");
      });
    </script>
  </body>
</html>`;
}

function renderErrorPage(title: string, message: string): string {
	return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Jobber OAuth Error</title>
    <style>
      body {
        margin: 0;
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        background: #2a1925;
        color: #ffffff;
        min-height: 100vh;
        display: grid;
        place-items: center;
        padding: 24px;
      }
      .card {
        width: min(720px, 100%);
        background: #41273b;
        border: 1px solid rgba(255, 255, 255, 0.15);
        border-radius: 24px;
        padding: 32px;
      }
      h1 {
        margin: 0 0 12px;
      }
      p {
        margin: 0 0 14px;
        line-height: 1.6;
      }
      code {
        font-family: Consolas, "Courier New", monospace;
      }
    </style>
  </head>
  <body>
    <section class="card">
      <h1>${escapeHtml(title)}</h1>
      <p>${escapeHtml(message)}</p>
      <p>Once the issue is fixed, restart the setup flow from <code>/api/jobber/oauth/start?secret=YOUR_SETUP_SECRET</code>.</p>
    </section>
  </body>
</html>`;
}
