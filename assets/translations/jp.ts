interface HomePageTranslations {
  common: {
    topBar: {
      vendorLinkLabel: string;
    };
    footer: {
      logoAlt: string;
      links: {
        company: string;
        informationHandling: string;
        faq: string;
        clientContact: string;
        vendorContact: string;
        listingRequest: string;
      };
    };
  };
  home: {
    hero: {
      title: string;
      description: string;
      primaryCta: string;
      secondaryCta: string;
      eyebrow: string;
      metricsTitle: string;
      metrics: {
        caseStudies: string;
        cardsPerPage: string;
        filterGroups: string;
      };
      highlights: {
        outcomeTitle: string;
        outcomeBody: string;
        trustTitle: string;
        trustBody: string;
      };
    };
    caseStudies: {
      eyebrow: string;
      sectionTitle: string;
      sectionDescription: string;
      filters: {
        challenge: string;
        industry: string;
        phase: string;
      };
      actions: {
        search: string;
        previous: string;
        next: string;
      };
      layout: {
        filterPanelEyebrow: string;
        selectedCountLabel: string;
      };
      toast: {
        title: string;
      };
      states: {
        empty: string;
        error: string;
        loading: string;
      };
      meta: {
        pageLabel: string;
        totalLabel: string;
      };
      card: {
        viewArticle: string;
        moreArticle: string;
        closeArticle: string;
        price: string;
        initialCost: string;
        freePlan: string;
        freeTrial: string;
        dataCondition: string;
        duration: string;
        outcome: string;
        selectLabel: string;
        maxSelectionError: string;
      };
    };
  };
}

const translations: HomePageTranslations = {
  common: {
    topBar: {
      vendorLinkLabel: "ベンダーの方はこちら",
    },
    footer: {
      logoAlt: "Jisha footer logo",
      links: {
        company: "運営会社",
        informationHandling: "情報の取り扱い",
        faq: "よくある質問",
        clientContact: "発注者様お問い合わせ",
        vendorContact: "ベンダー様お問い合わせ",
        listingRequest: "掲載希望企業様",
      },
    },
  },
  home: {
    hero: {
      title: "AI開発を、実績で学ぶ",
      description:
        "成果・データ条件・期間まで見て、納得して選べる",
      primaryCta: "実績を見る",
      secondaryCta: "無料で相談する",
      eyebrow: "AI Development Case Library",
      metricsTitle: "Selected Metrics",
      metrics: {
        caseStudies: "case studies",
        cardsPerPage: "cards per page",
        filterGroups: "filter groups",
      },
      highlights: {
        outcomeTitle: "Outcome",
        outcomeBody:
          "成果・データ条件・期間まで同じ面で比較できる構成に限定。",
        trustTitle: "Trust",
        trustBody: "まず実績を見て、次に相談する導線を一画面に集約。",
      },
    },
    caseStudies: {
      eyebrow: "Case Studies",
      sectionTitle: "成果で、比較する。",
      sectionDescription:
        "業界・課題・成果・データ条件で絞り込めます。",
      filters: {
        challenge: "課題",
        industry: "業界",
        phase: "フェーズ",
      },
      actions: {
        search: "検索する",
        previous: "前の記事",
        next: "次の記事",
      },
      layout: {
        filterPanelEyebrow: "Filter View",
        selectedCountLabel: "選択中",
      },
      toast: {
        title: "Selection Limit",
      },
      states: {
        empty: "条件に一致する実績はありません。",
        error: "実績データの取得に失敗しました。",
        loading: "実績データを読み込み中です。",
      },
      meta: {
        pageLabel: "ページ",
        totalLabel: "総件数",
      },
      card: {
        viewArticle: "記事を見る",
        moreArticle: "もっと見る",
        closeArticle: "閉じる",
        price: "費用",
        initialCost: "初期費用",
        freePlan: "無料プラン",
        freeTrial: "無料トライアル",
        dataCondition: "データ条件",
        duration: "期間",
        outcome: "成果",
        selectLabel: "比較",
        maxSelectionError: "比較対象は5件まで選択できます。",
      },
    },
  },
};

export default translations;
