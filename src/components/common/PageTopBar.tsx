import TopBar from "@/components/common/TopBar";
import { getRequestLoginState } from "@/utils/auth/getRequestLoginState";

/**
 * Renders the shared top bar for the current page from request auth state.
 *
 * @returns The top bar that matches the mocked login state.
 */
export default async function PageTopBar() {
  const isLoggedIn = await getRequestLoginState();

  return <TopBar isLoggedIn={isLoggedIn} />;
}
