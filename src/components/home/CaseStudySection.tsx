"use client";

import { useEffect, useState } from "react";

import translations from "../../../assets/translations/jp";
import CaseStudyCard from "./CaseStudyCard";
import CaseStudyFilterPanel from "./CaseStudyFilterPanel";
import SelectionToast from "./SelectionToast";

import type {
  CaseStudySelectionState,
  CaseStudyFilterGroups,
  CaseStudyListResponse,
  SelectionToastState,
} from "@/types/caseStudy";

interface DraftFilters {
  challenge: string[];
  industry: string[];
  phase: string[];
}

interface ApiSuccess {
  ok: true;
  data: CaseStudyListResponse;
}

interface ApiFailure {
  ok: false;
  error: {
    code: string;
    message: string;
  };
}

type ApiResponse = ApiSuccess | ApiFailure;

const emptyFilters: DraftFilters = {
  challenge: [],
  industry: [],
  phase: [],
};

const emptyAvailableFilters: CaseStudyFilterGroups = {
  challenge: [],
  industry: [],
  phase: [],
};

const MAX_SELECTIONS = 5 as const;
const TOAST_DURATION_MS = 3000;

/**
 * Builds the query string for a case-study request.
 *
 * @param filters Applied filters.
 * @param page Current page number.
 * @returns URL search params string.
 */
function buildQuery(filters: DraftFilters, page: number): string {
  const searchParams = new URLSearchParams({ page: String(page) });

  filters.challenge.forEach((value) =>
    searchParams.append("challenge", value),
  );
  filters.industry.forEach((value) =>
    searchParams.append("industry", value),
  );
  filters.phase.forEach((value) => searchParams.append("phase", value));

  return searchParams.toString();
}

/**
 * Toggles a value inside a grouped draft filter selection.
 *
 * @param current Current selected values.
 * @param value Value to toggle.
 * @returns Updated selection values.
 */
function toggleValue(current: string[], value: string): string[] {
  return current.includes(value)
    ? current.filter((item) => item !== value)
    : [...current, value];
}

/**
 * Renders the case-study search and listing section.
 *
 * @returns Interactive case-study section.
 */
export default function CaseStudySection() {
  const labels = translations.home.caseStudies;
  const [draftFilters, setDraftFilters] = useState<DraftFilters>(emptyFilters);
  const [appliedFilters, setAppliedFilters] =
    useState<DraftFilters>(emptyFilters);
  const [currentPage, setCurrentPage] = useState(1);
  const [items, setItems] = useState<CaseStudyListResponse["items"]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [availableFilters, setAvailableFilters] =
    useState<CaseStudyFilterGroups>(emptyAvailableFilters);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectionState, setSelectionState] =
    useState<CaseStudySelectionState>({
      selectedIds: [],
      maxSelections: MAX_SELECTIONS,
    });
  const [toastState, setToastState] = useState<SelectionToastState>({
    open: false,
    message: "",
  });

  useEffect(() => {
    let active = true;

    async function fetchCaseStudies() {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const query = buildQuery(appliedFilters, currentPage);
        const response = await fetch(`/api/case-studies?${query}`);
        const payload = (await response.json()) as ApiResponse;

        if (!response.ok || !payload.ok) {
          throw new Error("Failed to fetch case studies.");
        }

        if (!active) {
          return;
        }

        setItems(payload.data.items);
        setTotalPages(payload.data.totalPages);
        setCurrentPage(payload.data.currentPage);
        setAvailableFilters(payload.data.availableFilters);
      } catch (error) {
        console.error(error);

        if (!active) {
          return;
        }

        setErrorMessage(labels.states.error);
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    fetchCaseStudies();

    return () => {
      active = false;
    };
  }, [appliedFilters, currentPage, labels.states.error]);

  useEffect(() => {
    if (!toastState.open) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setToastState((current) => ({ ...current, open: false }));
    }, TOAST_DURATION_MS);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [toastState.open, toastState.message]);

  /**
   * Updates draft filter state for one checkbox change.
   *
   * @param group Filter group key.
   * @param value Filter value to toggle.
   * @returns Nothing.
   */
  function handleToggle(group: keyof DraftFilters, value: string) {
    setDraftFilters((current) => ({
      ...current,
      [group]: toggleValue(current[group], value),
    }));
  }

  /**
   * Applies the current draft filters and restarts pagination.
   *
   * @returns Nothing.
   */
  function handleSearch() {
    setAppliedFilters(draftFilters);
    setCurrentPage(1);
  }

  /**
   * Moves to the previous result page when possible.
   *
   * @returns Nothing.
   */
  function handlePrevious() {
    setCurrentPage((page) => Math.max(1, page - 1));
  }

  /**
   * Moves to the next result page when possible.
   *
   * @returns Nothing.
   */
  function handleNext() {
    setCurrentPage((page) => Math.min(totalPages, page + 1));
  }

  /**
   * Applies card selection limits and toast feedback.
   *
   * @param cardId Case-study identifier.
   * @param checked Next checkbox state.
   * @returns Nothing.
   */
  function handleSelectionChange(cardId: string, checked: boolean) {
    setSelectionState((current) => {
      if (!checked) {
        return {
          ...current,
          selectedIds: current.selectedIds.filter((id) => id !== cardId),
        };
      }

      if (current.selectedIds.includes(cardId)) {
        return current;
      }

      if (current.selectedIds.length >= current.maxSelections) {
        setToastState({
          open: true,
          message: labels.card.maxSelectionError,
        });

        return current;
      }

      return {
        ...current,
        selectedIds: [...current.selectedIds, cardId],
      };
    });
  }

  return (
    <section id="case-studies" className="px-6 py-20 sm:px-8 lg:px-10">
      <SelectionToast
        open={toastState.open}
        message={toastState.message}
      />
      <div className="mx-auto w-full max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold tracking-[0.2em] text-sky-700 uppercase">
            {labels.eyebrow}
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-5xl">
            {labels.sectionTitle}
          </h2>
          <p className="mt-5 text-base leading-8 text-slate-700 sm:text-lg">
            {labels.sectionDescription}
          </p>
        </div>
        <div className="mt-10 grid gap-8 lg:grid-cols-[22rem_minmax(0,1fr)] lg:items-start">
          <CaseStudyFilterPanel
            availableFilters={availableFilters}
            draftFilters={draftFilters}
            isLoading={isLoading}
            onToggle={handleToggle}
            onSearch={handleSearch}
          />
          <div className="space-y-5">
            {errorMessage ? (
              <div className="rounded-[1.75rem] border border-rose-200 bg-rose-50 px-6 py-10 text-sm text-rose-700">
                {errorMessage}
              </div>
            ) : null}
            {!errorMessage && items.length === 0 && !isLoading ? (
              <div className="rounded-[1.75rem] border border-slate-200 bg-white px-6 py-10 text-sm text-slate-600">
                {labels.states.empty}
              </div>
            ) : null}
            <div className="space-y-4">
              {items.map((item) => (
                <CaseStudyCard
                  key={item.id}
                  item={item}
                  checked={selectionState.selectedIds.includes(item.id)}
                  onCheckedChange={(checked) =>
                    handleSelectionChange(item.id, checked)
                  }
                />
              ))}
              {isLoading ? (
                <div className="rounded-[1.75rem] border border-slate-200 bg-white px-6 py-10 text-sm text-slate-500">
                  {labels.states.loading}
                </div>
              ) : null}
            </div>
            <div className="flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={handlePrevious}
                disabled={isLoading || currentPage <= 1}
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-slate-300 bg-white px-6 text-sm font-semibold text-slate-900 transition-colors hover:border-slate-950 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {labels.actions.previous}
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={isLoading || currentPage >= totalPages}
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-slate-950 px-6 text-sm font-semibold text-white transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {labels.actions.next}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
