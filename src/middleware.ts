import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import {
  MOCK_AUTH_COOKIE_NAME,
  parseMockLoginState,
  REQUEST_LOGIN_STATE_HEADER,
} from "@/utils/auth/mockAuthState";

/**
 * Injects the mocked login state into the request headers for server reads.
 *
 * @param request - The incoming Next.js request.
 * @returns The continued response with the auth state header attached.
 */
export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  const storedState = request.cookies.get(MOCK_AUTH_COOKIE_NAME)?.value;
  const isLoggedIn = parseMockLoginState(storedState);

  requestHeaders.set(REQUEST_LOGIN_STATE_HEADER, String(isLoggedIn));

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
