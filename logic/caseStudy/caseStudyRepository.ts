import { readFile } from "node:fs/promises";
import path from "node:path";

import type { CaseStudyRecord } from "@/types/caseStudy";
import type { Result } from "@/types/result";

export const CASE_STUDY_CHALLENGE_CATEGORIES = [
  {
    id: "operations",
    label: "現場・オペレーション系",
    items: [
      "検査・品質管理",
      "異常検知",
      "需要予測",
      "生産・工程最適化",
      "在庫・物流最適化",
      "設備保全",
    ],
  },
  {
    id: "analysis",
    label: "分析・意思決定支援系",
    items: [
      "データ分析",
      "予測モデル構築",
      "要因分析",
      "レポーティング自動化",
    ],
  },
  {
    id: "automation",
    label: "業務自動化系",
    items: [
      "書類処理（OCR）",
      "問い合わせ対応自動化",
      "ナレッジ検索・RAG",
      "チャットボット",
      "音声・議事録処理",
    ],
  },
  {
    id: "marketing",
    label: "マーケ・顧客系",
    items: ["顧客分析・レコメンド・価格最適化・解約予測"],
  },
  {
    id: "design",
    label: "設計・開発支援系",
    items: [
      "図面解析",
      "配置・レイアウト最適化",
      "シミュレーション・スケジューリング",
    ],
  },
  {
    id: "workforce",
    label: "人材・管理系",
    items: ["シフト作成", "人員配置最適化", "業務可視化"],
  },
] as const;

export const CASE_STUDY_FILTERS = {
  challenge: CASE_STUDY_CHALLENGE_CATEGORIES.flatMap((category) =>
    category.items,
  ),
  industry: [
    "製造業",
    "建設・不動産",
    "医療・ヘルスケア",
    "物流・運輸",
    "小売・EC",
    "IT・情報通信",
    "金融",
    "公共・インフラ",
    "教育",
    "エネルギー",
    "食品・農業",
    "サービス業",
  ],
  phase: ["検証段階（PoC）", "本番導入", "横展開済み"],
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

/**
 * Loads case-study records by id while preserving the requested order.
 *
 * @param ids Requested case-study ids.
 * @returns Matching case-study records or an IO error result.
 */
export async function getCaseStudyRecordsByIds(
  ids: string[],
): Promise<Result<CaseStudyRecord[]>> {
  const recordsResult = await getCaseStudyRecords();

  if (!recordsResult.ok) {
    return recordsResult;
  }

  const recordsById = new Map(
    recordsResult.data.map((record) => [record.id, record]),
  );

  return {
    ok: true,
    data: ids.flatMap((id) => {
      const record = recordsById.get(id);

      return record ? [record] : [];
    }),
  };
}
