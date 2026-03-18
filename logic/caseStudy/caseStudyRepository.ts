import { readFile } from "node:fs/promises";
import path from "node:path";

import type { CaseStudyRecord } from "@/types/caseStudy";
import type { Result } from "@/types/result";

export const CASE_STUDY_FILTERS = {
  challenge: [
    "問い合わせ対応",
    "書類作成",
    "ナレッジ共有",
    "営業支援",
    "データ分析",
  ],
  industry: ["製造", "小売", "金融", "医療", "物流", "不動産"],
  phase: ["PoC", "導入初期", "運用拡大", "全社展開"],
} as const;

/**
 * Loads all case study records from the JSON sample data file.
 *
 * @returns Loaded case study records or an IO error result.
 */
export async function getCaseStudyRecords(): Promise<
  Result<CaseStudyRecord[]>
> {
  try {
    const filePath = path.join(process.cwd(), "db", "case-studies.json");
    const raw = await readFile(filePath, "utf8");
    const parsed: unknown = JSON.parse(raw);

    if (!Array.isArray(parsed)) {
      return {
        ok: false,
        error: {
          code: "IO_ERROR",
          message: "Case study data must be an array.",
        },
      };
    }

    return { ok: true, data: parsed as CaseStudyRecord[] };
  } catch (error) {
    console.error(error);

    return {
      ok: false,
      error: {
        code: "IO_ERROR",
        message: "Failed to load case study data.",
      },
    };
  }
}
