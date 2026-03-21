import PublicTopBar from "@/components/common/PublicTopBar";

import AuthenticatedTopBar from "./AuthenticatedTopBar";
import translations from "../../../assets/translations/jp";

interface TopBarProps {
  isLoggedIn: boolean;
}

/**
 * Selects the correct top bar variant from the mocked auth state.
 *
 * @param props - Component props.
 * @param props.isLoggedIn - Mocked login state from the layout.
 * @returns The public or authenticated top bar.
 */
export default function TopBar({ isLoggedIn }: TopBarProps) {
  if (!isLoggedIn) {
    return <PublicTopBar />;
  }

  return (
    <AuthenticatedTopBar
      companyName={translations.common.topBar.userMenu.companyName}
    />
  );
}
