# Implementation Instruction

> **This document is the ONLY specification for the feature.**
> The AI must implement **strictly** according to this instruction and repository-wide rules
>
> **Forbidden actions**
> - Adding new features not described here
> - Guessing or assuming unspecified behavior
> - Refactoring unrelated code
> - Changing data structures unless explicitly stated
> - UI redesign beyond the minimal page defined here
> - Modifying any logic or files outside the defined scope

---

## 1. Overview
This feature starts the Next.js project by replacing the default create-next-app home screen with a minimal original top page that confirms the application is running. The purpose is to establish the first visible page and remove starter-template content so development can continue from a clean baseline. The behavior is limited to static rendering of a simple initial page with project-specific text. This does not extend any existing business feature, API, or domain logic.

---

## 2. Scope

## 2.1 In Scope (MUST implement)

- [ ] Replace the default content in `src/app/page.tsx` with a simple static top page for project start-up
- [ ] Use translation keys for all user-visible text on the page instead of hard-coded UI strings
- [ ] Define only the translation keys needed for this initial page in `assets/translations/jp.ts`
- [ ] Update page metadata in `src/app/layout.tsx` so it no longer uses create-next-app defaults
- [ ] Keep the page implementation within the App Router structure already present in `src/app`
- [ ] Keep the page static only; no forms, API calls, repository access, or business logic

## 2.2 Out of Scope (MUST NOT implement)

- No refactoring of unrelated code
- No renaming existing identifiers unless required for this page implementation
- No new endpoints, route handlers, or server actions
- No additions under `logic/`, `db/`, `src/utils/`, or `src/types/`
- No database, JSON, CSV, or external API integration
- No localization framework introduction beyond the direct translation definition needed for this page
- No dark-mode redesign, animation system, or advanced visual polish
- No new reusable component library setup
- No modification of files not listed in Section 3

---

# 3. Affected Files & Locations

> The AI may only create or modify files listed here.
> All other files are strictly off-limits.

## 3.1 New Files

- None

## 3.2 Modified Files

- `src/app/page.tsx`: replace starter template UI with the first project home page
- `src/app/layout.tsx`: update metadata values from the default create-next-app values to project-start values
- `assets/translations/jp.ts`: add the translation object or exported values required by the page text

## 3.3 Reference Only (MUST NOT modify)

- `AGENTS.md`
- `AI/task/seed.md`
- `AI/task/templates/instruction_template.md`
- `src/app/globals.css`
- `src/types/result.ts`

---

# 4. Data Structures & Models

This feature does not introduce domain models, API payloads, or persistence models.

## 4.1 TypeScript Interfaces / Types

```ts
export interface HomePageTranslations {
  home: {
    hero: {
      title: string;
      description: string;
    };
  };
}
```

Constraints:

- Only the keys required for the initial page may be defined
- All page text must come from the translation structure
- No additional shared types may be introduced outside the listed files

## 4.2 CSV / Database Schema

Not applicable.

---

# 5. Logic Specification

This feature must remain presentation-only and must not add business logic.

## 5.1 Inputs

- Static translation values imported from `assets/translations/jp.ts`
- No user input
- No route parameters
- No API request data
- No repository or database data

## 5.2 Processing Flow (Strict Order)

1. Load the translation values required for the home page
2. Render the page title and supporting description from those values
3. Export the page component as the default App Router home page

## 5.3 Outputs

The feature must produce:

- A rendered static home page at `/`
- Project-specific metadata instead of create-next-app defaults
- A translation-backed source for all user-visible text on the page

## 5.4 Error Handling

- No new `Result<T>`-based logic is required because this feature must not add business logic
- The implementation must avoid runtime-only assumptions such as nullable translation access
- If a translation object is defined, it must be typed so missing keys are caught by TypeScript

---

# 6. UI Specification

## 6.1 Component Structure

Define:

- Page component: default export in `src/app/page.tsx`
- No props
- No internal state
- No interaction with `logic/` or API routes

## 6.2 Layout & Behavior

- Display a simple initial page that clearly indicates the project has started
- Include one main heading and one short supporting description
- Keep the layout minimal and static
- Remove all create-next-app starter links, logos, and external navigation
- The page must render correctly on desktop and mobile widths using existing styling capabilities
- Do not add forms, buttons with behavior, modal dialogs, tabs, or dynamic sections

## 6.3 Translations

All UI text must use translation keys.
**Hard-coded text is strictly forbidden.**

Required keys:

- `home.hero.title`
- `home.hero.description`

---

# 7. Edge Cases & Constraints

The implementation must handle:

- No dependency on missing API, logic, or repository layers
- No reliance on sample data under `db/`
- No remaining create-next-app default title or description metadata
- No remaining starter-template UI content on the home page
- Type-safe access to translation keys
- A minimal implementation only; do not infer extra sections such as features, pricing, contact, or dashboard links

---

# 8. Acceptance Criteria (Definition of Done)

The feature is considered complete only if:

- All items in **Section 2.1 (In Scope)** are fully implemented
- No scope creep: nothing outside In Scope is added
- Only files listed in **Section 3** were modified
- The `/` page no longer shows create-next-app default content
- All visible page text is sourced from `assets/translations/jp.ts`
- `src/app/layout.tsx` metadata no longer uses `Create Next App` or `Generated by create next app`
- No API route, logic layer, repository layer, or sample data changes were introduced
