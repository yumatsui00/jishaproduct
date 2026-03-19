interface HomePageTranslations {
  common: {
    topBar: {
      vendorLinkLabel: string;
      postArticleLabel: string;
      notificationsLabel: string;
      userMenu: {
        openLabel: string;
        companyLabel: string;
        companyName: string;
        settingsLabel: string;
        logoutLabel: string;
      };
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
        loadMore: string;
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
      notification: {
        noMoreArticles: string;
      };
      selectionBar: {
        title: string;
        description: string;
        requestAppointment: string;
        minimize: string;
        restore: string;
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
  appointment: {
    page: {
      title: string;
      description: string;
    };
    selectedArticles: {
      title: string;
      empty: string;
      error: string;
    };
    form: {
      companyName: string;
      contactName: string;
      jobTitle: string;
      email: string;
      phone: string;
      referralSource: string;
      industry: string;
      challenge: string;
      objective: string;
      projectStartTiming: string;
      budget: string;
      details: string;
      submit: string;
      optional: string;
      placeholders: {
        companyName: string;
        contactName: string;
        jobTitle: string;
        email: string;
        phone: string;
        referralSource: string;
        industry: string;
        challenge: string;
        objective: string;
        projectStartTiming: string;
        budget: string;
        details: string;
      };
    };
    validation: {
      required: string;
      email: string;
    };
  };
}

const translations: HomePageTranslations = {
  common: {
    topBar: {
      vendorLinkLabel: "ベンダーの方はこちら",
      postArticleLabel: "記事投稿",
      notificationsLabel: "通知",
      userMenu: {
        openLabel: "ユーザーメニューを開く",
        companyLabel: "Company",
        companyName: "株式会社Jisha",
        settingsLabel: "設定",
        logoutLabel: "ログアウト",
      },
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
        "課題・業界・フェーズで実績を絞り込みできます。",
      filters: {
        challenge: "課題",
        industry: "業界",
        phase: "フェーズ",
      },
      actions: {
        search: "検索する",
        previous: "前の記事",
        next: "次の記事",
        loadMore: "更に記事を読む",
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
      notification: {
        noMoreArticles: "これ以上読める記事はありません。",
      },
      selectionBar: {
        title: "選択中の記事",
        description: "比較した記事について、そのままアポイント希望を送れます。",
        requestAppointment: "選択した記事投稿者にアポイントを取る",
        minimize: "縮小する",
        restore: "元に戻す",
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
        maxSelectionError: "一度に最大5件まで選択できます。",
      },
    },
  },
  appointment: {
    page: {
      title: "アポイントメントフォーム",
      description:
        "選択した記事を確認しながら、会社情報とご相談内容を入力してください。",
    },
    selectedArticles: {
      title: "選択中の記事",
      empty: "選択中の記事はありません。",
      error: "存在しない記事IDが含まれています。",
    },
    form: {
      companyName: "貴社名",
      contactName: "担当者名",
      jobTitle: "役職",
      email: "email",
      phone: "電話",
      referralSource: "どこで知りましたか",
      industry: "業種選択",
      challenge: "課題選択",
      objective: "目的、検討状況",
      projectStartTiming: "プロジェクト着手タイミング",
      budget: "予算",
      details: "内容",
      submit: "送信する",
      optional: "任意",
      placeholders: {
        companyName: "株式会社サンプル",
        contactName: "山田 太郎",
        jobTitle: "営業企画部 マネージャー",
        email: "example@company.co.jp",
        phone: "03-1234-5678",
        referralSource: "検索、紹介、展示会など",
        industry: "業種を選択してください",
        challenge: "課題を選択してください",
        objective: "導入目的や現在の検討状況をご記入ください",
        projectStartTiming: "3か月以内、来期予定など",
        budget: "500万円程度、未定など",
        details: "ご相談内容や実現したいことをご記入ください",
      },
    },
    validation: {
      required: "必須項目です。",
      email: "メールアドレスの形式が正しくありません。",
    },
  },
};

export default translations;
