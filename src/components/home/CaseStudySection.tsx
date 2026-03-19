"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import translations from "../../../assets/translations/jp";
import CaseStudyCard from "./CaseStudyCard";
import CaseStudyFilterPanel from "./CaseStudyFilterPanel";
import SelectionActionBar from "./SelectionActionBar";
import SelectionToast from "./SelectionToast";
import TopNotification from "./TopNotification";

import type {
  CaseStudyChallengeCategory,
  CaseStudyDraftFilters,
  CaseStudySelectionState,
  CaseStudyFilterGroups,
  CaseStudyListResponse,
  SelectionToastState,
} from "@/types/caseStudy";

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

const emptyFilters: CaseStudyDraftFilters = {
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
const NOTIFICATION_DURATION_MS = 3000;

/**
 * Builds the query string for a case-study request.
 *
 * @param filters Applied filters.
 * @param page Current page number.
 * @returns URL search params string.
 */
function buildQuery(
  filters: CaseStudyDraftFilters,
  page: number,
): string {
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
 * Toggles all child items for one challenge category.
 *
 * @param current Current selected challenge values.
 * @param category Challenge category metadata.
 * @returns Updated selected challenge values.
 */
function toggleCategoryValues(
  current: string[],
  category: CaseStudyChallengeCategory,
): string[] {
  const next = new Set(current);
  const allSelected = category.items.every((item) =>
    next.has(item.value),
  );

  category.items.forEach((item) => {
    if (allSelected) {
      next.delete(item.value);
      return;
    }

    next.add(item.value);
  });

  return [...next];
}

/**
 * Renders the case-study search and listing section.
 *
 * @returns Interactive case-study section.
 */
export default function CaseStudySection() {
  const labels = translations.home.caseStudies;
  const requestIdRef = useRef(0);
  const [draftFilters, setDraftFilters] =
    useState<CaseStudyDraftFilters>(emptyFilters);
  const [appliedFilters, setAppliedFilters] =
    useState<CaseStudyDraftFilters>(emptyFilters);
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
  const [topNotification, setTopNotification] = useState({
    open: false,
    message: "",
  });
  const [hasReachedEnd, setHasReachedEnd] = useState(false);

  useEffect(() => {
    const requestId = ++requestIdRef.current;

    async function fetchInitialCaseStudies() {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const query = buildQuery(appliedFilters, 1);
        const response = await fetch(`/api/case-studies?${query}`);
        const payload = (await response.json()) as ApiResponse;

        if (!response.ok || !payload.ok) {
          throw new Error("Failed to fetch case studies.");
        }

        if (requestId !== requestIdRef.current) {
          return;
        }

        setItems(payload.data.items);
        setTotalPages(payload.data.totalPages);
        setCurrentPage(payload.data.currentPage);
        setAvailableFilters(payload.data.availableFilters);
        setHasReachedEnd(payload.data.currentPage >= payload.data.totalPages);
      } catch (error) {
        console.error(error);

        if (requestId !== requestIdRef.current) {
          return;
        }

        setErrorMessage(labels.states.error);
      } finally {
        if (requestId === requestIdRef.current) {
          setIsLoading(false);
        }
      }
    }

    void fetchInitialCaseStudies();
  }, [appliedFilters, labels.states.error]);

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

  useEffect(() => {
    if (!topNotification.open) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setTopNotification((current) => ({ ...current, open: false }));
    }, NOTIFICATION_DURATION_MS);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [topNotification.open, topNotification.message]);

  /**
   * Loads case studies from the API.
   *
   * @param page Requested page number.
   * @param append Whether to append the result items.
   * @returns Nothing.
   */
  async function fetchCaseStudies(page: number, append: boolean) {
    const requestId = ++requestIdRef.current;

    setIsLoading(true);

    if (!append) {
      setErrorMessage("");
    }

    try {
      const query = buildQuery(appliedFilters, page);
      const response = await fetch(`/api/case-studies?${query}`);
      const payload = (await response.json()) as ApiResponse;

      if (!response.ok || !payload.ok) {
        throw new Error("Failed to fetch case studies.");
      }

      if (requestId !== requestIdRef.current) {
        return;
      }

      setItems((current) =>
        append ? [...current, ...payload.data.items] : payload.data.items,
      );
      setTotalPages(payload.data.totalPages);
      setCurrentPage(payload.data.currentPage);
      setAvailableFilters(payload.data.availableFilters);
      setHasReachedEnd(payload.data.currentPage >= payload.data.totalPages);
    } catch (error) {
      console.error(error);

      if (requestId !== requestIdRef.current) {
        return;
      }

      setErrorMessage(labels.states.error);
    } finally {
      if (requestId === requestIdRef.current) {
        setIsLoading(false);
      }
    }
  }

  /**
   * Updates draft filter state for one checkbox change.
   *
   * @param group Filter group key.
   * @param value Filter value to toggle.
   * @returns Nothing.
   */
  function handleToggle(
    group: keyof CaseStudyDraftFilters,
    value: string,
  ) {
    setDraftFilters((current) => ({
      ...current,
      [group]: toggleValue(current[group], value),
    }));
  }

  /**
   * Updates draft challenge filters for one middle category toggle.
   *
   * @param categoryId Challenge category identifier.
   * @returns Nothing.
   */
  function handleChallengeCategoryToggle(categoryId: string) {
    const category = availableFilters.challenge.find(
      (current) => current.id === categoryId,
    );

    if (!category) {
      return;
    }

    setDraftFilters((current) => ({
      ...current,
      challenge: toggleCategoryValues(current.challenge, category),
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
   * Loads more case-study items when available.
   *
   * @returns Nothing.
   */
  function handleLoadMore() {
    if (isLoading) {
      return;
    }

    if (currentPage >= totalPages) {
      setHasReachedEnd(true);
      setTopNotification({
        open: true,
        message: labels.notification.noMoreArticles,
      });
      return;
    }

    void fetchCaseStudies(currentPage + 1, true);
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
      <TopNotification
        open={topNotification.open}
        message={topNotification.message}
      />
      <SelectionActionBar
        open={selectionState.selectedIds.length > 0}
        selectedCount={selectionState.selectedIds.length}
        selectedIds={selectionState.selectedIds}
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
            onToggleChallengeCategory={handleChallengeCategoryToggle}
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
            <div className="flex justify-center">
              <button
                type="button"
                onClick={handleLoadMore}
                disabled={isLoading || hasReachedEnd}
                className="inline-flex min-h-12 items-center justify-center rounded-[0.95rem] bg-sky-600 px-6 text-sm font-semibold text-white transition-colors hover:bg-sky-500 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500"
              >
                {labels.actions.loadMore}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
