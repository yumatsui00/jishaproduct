export const MOCK_AUTH_COOKIE_NAME = "mock-auth-state";
export const REQUEST_LOGIN_STATE_HEADER = "x-is-logged-in";

/**
 * Converts the mocked auth storage value into a boolean login state.
 *
 * @param value - Cookie or header value from the current request.
 * @returns True when the stored mock auth state is `"true"`.
 */
export function parseMockLoginState(
  value: string | null | undefined,
): boolean {
  return value === "false";
}
