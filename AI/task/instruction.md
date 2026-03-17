# Implementation Instruction

> **This document is the ONLY specification for the feature.**  
> The AI must implement **strictly** according to this instruction and repository-wide rules  
>
> **Forbidden actions**
> - Adding new features not described here  
> - Guessing or assuming unspecified behavior  
> - Refactoring unrelated code  
> - Changing data structures unless explicitly stated  
> - UI redesign  
> - Modifying any logic or files outside the defined scope

---

## 1. Overview
This feature adds a shared top bar for non-authenticated users and makes it render across the application through the global layout. The top bar must provide a clickable logo on the left that routes to `/` and a vendor link on the right that routes to `/vendor`. This is a common UI addition only; it does not add business logic, API behavior, or authenticated-user behavior.

---

## 2. Scope

## 2.1 In Scope (MUST implement)

- [ ] Create a non-authenticated shared top bar component under `src/components/common`.
- [ ] Render `public/Logo.png` on the left side of the top bar.
- [ ] Make the logo clickable and route to `/`.
- [ ] Render a right-side link for vendors that routes to `/vendor`.
- [ ] Use the main white visual style for the top bar.
- [ ] Add required translation keys for the top bar text.
- [ ] Integrate the shared top bar into the global layout so it appears on all pages that use `src/app/layout.tsx`.

## 2.2 Out of Scope (MUST NOT implement)

- No refactoring of unrelated code
- No renaming existing identifiers
- No changes to UI beyond what is defined in In Scope
- No new endpoints or data models not explicitly listed
- No design or layout overhaul
- No performance optimization unless required
- No modification of files not listed in Section 3
- No implementation of an authenticated-user top bar
- No implementation of the `/vendor` page itself
- No addition of business logic, repositories, API routes, or database access
- No hardcoded UI text in the component

---

# 3. Affected Files & Locations

> The AI may only create or modify files listed here.  
> All other files are strictly off-limits.

## 3.1 New Files
- `src/components/common/PublicTopBar.tsx`: shared non-authenticated top bar component rendered across the app

## 3.2 Modified Files
- `src/app/layout.tsx`: insert the shared top bar into the global app layout so it is visible on all pages
- `assets/translations/jp.ts`: add the translation keys required by the new top bar UI

## 3.3 Reference Only (MUST NOT modify)
- `AGENTS.md`
- `AI/task/seed.md`
- `public/Logo.png`
- `src/app/page.tsx`

---

# 4. Data Structures & Models

> All relevant data definitions must be explicitly stated here.  
> The AI must **not** add, remove, or alter fields unless stated in this section.

## 4.1 TypeScript Interfaces / Types

```ts
interface TopBarTranslations {
  common: {
    topBar: {
      vendorLinkLabel: string;
    };
  };
}

interface HomePageTranslations extends TopBarTranslations {
  home: {
    hero: {
      title: string;
      description: string;
    };
  };
}
```

Constraints:

- `vendorLinkLabel` must contain the UI label for the vendor link
- Existing `home.hero.title` and `home.hero.description` keys must remain available
- No additional translation namespaces or keys may be introduced unless required by this feature

## 4.2 CSV / Database Schema

This feature does not interact with CSV files or a database.

---

# 5. Logic Specification

## 5.1 Inputs

- Translation value: `translations.common.topBar.vendorLinkLabel`
- Static asset path: `/Logo.png`
- Navigation targets: `/` and `/vendor`
- `children: React.ReactNode` received by `src/app/layout.tsx`

## 5.2 Processing Flow (Strict Order)

1. Extend the translation object with the top bar label key
2. Create the shared `PublicTopBar` component under `src/components/common`
3. Render the logo image on the left and wrap it with navigation to `/`
4. Render the vendor link label on the right and link it to `/vendor`
5. Apply a white main visual style to the top bar
6. Mount the shared top bar from `src/app/layout.tsx` above page content so all pages display it

## 5.3 Outputs

The feature must produce:

- A reusable `PublicTopBar` component
- A globally rendered top bar for all pages using the root layout
- A logo-based navigation entry to `/`
- A vendor link navigation entry to `/vendor`
- Updated translation data containing the new top bar label

## 5.4 Error Handling

No `logic/`, API, repository, or `Result<T>` handling is introduced by this feature.

UI implementation rules:

- The component must avoid introducing runtime assumptions beyond the listed translation key and static asset
- If existing layout structure is preserved, the top bar must not block page content rendering

---

# 6. UI Specification (If applicable)

## 6.1 Component Structure

Component:

- `PublicTopBar`

Props:

- No props

Internal state:

- No local state

Interaction:

- Reads the vendor label from the translation module
- Uses standard Next.js navigation primitives for the two links

## 6.2 Layout & Behavior

- Place the top bar at the top of the global layout
- Left area: display `public/Logo.png`
- Clicking the logo navigates to `/`
- Right area: display the vendor link label
- Clicking the vendor link navigates to `/vendor`
- The main color direction of the top bar must be white
- Keep behavior limited to layout-level rendering; no dropdowns, menus, auth state branching, or responsive redesign beyond what is necessary for basic display

## 6.3 Translations

All UI text must use translation keys.  
**Hard-coded text is strictly forbidden.**

Required key:

```ts
common.topBar.vendorLinkLabel
```

The value should represent the seed requirement text for the vendor link.

---

# 7. Edge Cases & Constraints

The implementation must handle:

- Rendering through the root layout without removing existing page content
- The top bar appearing on the home page and any future pages under the same layout
- Absence of authenticated-user branching in this feature
- Reuse of the existing `public/Logo.png` asset without duplicating or moving it
- Preservation of existing translation keys and metadata
- No direct hardcoded UI strings in the new component

---

# 8. Acceptance Criteria (Definition of Done)

The feature is considered complete only if:

- All items in **Section 2.1 (In Scope)** are fully implemented
- No scope creep: nothing outside In Scope is added
- Only files listed in **Section 3** were modified
- All data structures match **Section 4** exactly
- A new shared component exists at `src/components/common/PublicTopBar.tsx`
- `src/app/layout.tsx` renders the shared top bar for all pages
- The logo is visible on the left and routes to `/`
- The vendor link is visible on the right and routes to `/vendor`
- The top bar uses a white main visual style
- The vendor link label is sourced from translations, not hardcoded
