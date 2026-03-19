import { headers } from "next/headers";

import {
  parseMockLoginState,
  REQUEST_LOGIN_STATE_HEADER,
} from "@/utils/auth/mockAuthState";

/**
 * Reads the mocked login state injected by the middleware for this request.
 *
 * @returns The current mocked login state.
 */
export async function getRequestLoginState(): Promise<boolean> {
  const requestHeaders = await headers();

  return parseMockLoginState(
    requestHeaders.get(REQUEST_LOGIN_STATE_HEADER),
  );
}
