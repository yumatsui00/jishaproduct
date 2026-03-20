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
      scheduleRequired: string;
      scheduleMinimumDays: string;
      scheduleMinimumHours: string;
      scheduleCombined: string;
    };
    schedule: {
      label: string;
      helper: string;
      trigger: {
        open: string;
        edit: string;
        empty: string;
        selected: string;
      };
      sheet: {
        title: string;
        description: string;
        close: string;
        previousWeek: string;
        nextWeek: string;
      };
      requirement: {
        title: string;
        days: string;
        hours: string;
        progressDays: string;
        progressHours: string;
      };
      calendar: {
        allDay: string;
        unavailable: string;
        selected: string;
      };
    };
  };
  vendor: {
    hero: {
      eyebrow: string;
      title: string;
      description: string;
      primaryCta: string;
      secondaryCta: string;
      panelEyebrow: string;
      panelTitle: string;
      panelDescription: string;
      panelItems: {
        search: string;
        comparison: string;
        approval: string;
      };
      supportCards: {
        accumulationTitle: string;
        accumulationBody: string;
        approvalTitle: string;
        approvalBody: string;
      };
    };
    sections: {
      accumulation: {
        eyebrow: string;
        title: string;
        painPoints: {
          first: string;
          second: string;
          third: string;
          fourth: string;
        };
      };
      search: {
        eyebrow: string;
        title: string;
        description: string;
        comparisonNote: string;
        dimensionLabel: string;
        dimensions: {
          industry: string;
          challenge: string;
          outcome: string;
          dataCondition: string;
          phase: string;
        };
      };
      approval: {
        eyebrow: string;
        title: string;
        description: string;
        note: string;
      };
      contactFlow: {
        eyebrow: string;
        title: string;
        steps: {
          first: {
            step: string;
            body: string;
          };
          second: {
            step: string;
            body: string;
          };
          third: {
            step: string;
            body: string;
          };
        };
      };
      features: {
        label: string;
        requestTitle: string;
        requestBody: string;
        performanceTitle: string;
        performanceBody: string;
        selfServeTitle: string;
        selfServeBody: string;
      };
      listingFlow: {
        eyebrow: string;
        title: string;
        steps: {
          first: {
            step: string;
            title: string;
          };
          second: {
            step: string;
            title: string;
          };
          third: {
            step: string;
            title: string;
          };
          fourth: {
            step: string;
            title: string;
          };
        };
      };
    };
    faq: {
      eyebrow: string;
      title: string;
      free: {
        question: string;
        answer: string;
      };
      privateSettings: {
        question: string;
        answer: string;
      };
      requestApproval: {
        question: string;
        answer: string;
      };
      technicalDisclosure: {
        question: string;
        answer: string;
      };
    };
    finalCta: {
      eyebrow: string;
      title: string;
      primaryCta: string;
      secondaryCta: string;
    };
    form: {
      eyebrow: string;
      title: string;
      description: string;
      companyName: string;
      contactName: string;
      jobTitle: string;
      email: string;
      phone: string;
      referralSource: string;
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
      scheduleRequired: "候補日時を選択してください。",
      scheduleMinimumDays: "候補日時は{days}日以上選択してください。",
      scheduleMinimumHours: "候補日時は合計{hours}時間以上選択してください。",
      scheduleCombined:
        "候補日時は{days}日以上、合計{hours}時間以上選択してください。",
    },
    schedule: {
      label: "日程候補",
      helper:
        "選択した記事数に応じて、必要な日数と合計時間を満たす候補日時を選択してください。",
      trigger: {
        open: "候補日時を選択する",
        edit: "候補日時を編集する",
        empty: "未選択",
        selected: "{days}日 / {hours}時間を選択済み",
        selectedDatesLabel: "選択済み日程",
      },
      sheet: {
        title: "候補日時を選択",
        description:
          "現在時刻から24時間以降、15日以内の8:00〜20:00から選択できます。",
        close: "閉じる",
        previousWeek: "前の週",
        nextWeek: "次の週",
      },
      requirement: {
        title: "必要な候補日時",
        days: "{days}日以上",
        hours: "合計{hours}時間以上",
        progressDays: "選択済み日数: {days}日",
        progressHours: "選択済み時間: {hours}時間",
      },
      calendar: {
        allDay: "終日選択",
        unavailable: "選択不可",
        selected: "選択中",
      },
    },
  },
  vendor: {
    hero: {
      eyebrow: "Vendor Landing Page",
      title: "実績を、資産にする",
      description:
        "営業資料ではなく、「実績記事が」蓄積され、角度の高い発注者に届くプラットフォーム。　実績は一度公開すれば、検索され、比較され、選ばれ続けます。",
      primaryCta: "無料で掲載を始める",
      secondaryCta: "サービス資料を請求する",
      panelEyebrow: "Vendor Value",
      panelTitle: "一度の公開で、継続的に比較される導線をつくる。",
      panelDescription:
        "実績を広告枠ではなく記事として蓄積し、検索・比較・承認制接点につなげるベンダー向けLPです。",
      panelItems: {
        search: "検索流入が継続する",
        comparison: "内容で比較される",
        approval: "接点要求は承認制",
      },
      supportCards: {
        accumulationTitle: "Accumulation",
        accumulationBody:
          "営業のたびに説明を繰り返すのではなく、公開した実績が次の比較と商談の土台になります。",
        approvalTitle: "Approval",
        approvalBody:
          "興味を持った発注者のみが接点を求めるため、無差別な営業や不要な打診を抑えられます。",
      },
    },
    sections: {
      accumulation: {
        eyebrow: "Value",
        title: "営業は積み上がらない。でも実績は積み上がる。",
        painPoints: {
          first: "商談しても受注に至らない",
          second: "毎回同じ説明を繰り返している",
          third: "実績が営業資料の中に埋もれている",
          fourth: "比較サイトでは「カテゴリ」だけで並べられる",
        },
      },
      search: {
        eyebrow: "Search And Comparison",
        title: "実績が、検索され、比較され、評価される。",
        description:
          "本プラットフォームでは、業界・課題・成果・データ条件・導入フェーズを明示した「実績記事」が掲載されます。",
        comparisonNote:
          "広告枠ではなく、内容で比較される設計です。",
        dimensionLabel: "Dimension",
        dimensions: {
          industry: "業界",
          challenge: "課題",
          outcome: "成果",
          dataCondition: "データ条件",
          phase: "導入フェーズ",
        },
      },
      approval: {
        eyebrow: "Approval Based Request",
        title: "接点要求は承認制",
        description:
          "興味を持った発注者のみが接点をリクエスト。",
        note: "無差別な商談は発生しません。",
      },
      contactFlow: {
        eyebrow: "Flow To Contact",
        title: "一度公開した実績が、継続的な接点を生む。",
        steps: {
          first: {
            step: "① SEO流入",
            body: "業界・課題ページからの検索流入",
          },
          second: {
            step: "② 比較表示",
            body: "発注者の条件に応じて表示順位が決まる",
          },
          third: {
            step: "③ 承認制接点要求",
            body: "興味を持った企業だけが接点をリクエスト",
          },
        },
      },
      features: {
        label: "Platform Feature",
        requestTitle: "承認制接点要求",
        requestBody: "無差別営業は発生しません。",
        performanceTitle: "実績ベース表示",
        performanceBody: "広告ではなく実績内容で並びます。",
        selfServeTitle: "セルフ完結型",
        selfServeBody: "登録から掲載までオンラインで完結。",
      },
      listingFlow: {
        eyebrow: "Listing Flow",
        title: "掲載までの流れ",
        steps: {
          first: {
            step: "Step 1",
            title: "アカウント登録（3分）",
          },
          second: {
            step: "Step 2",
            title: "実績記事を投稿",
          },
          third: {
            step: "Step 3",
            title: "内容確認後、公開",
          },
          fourth: {
            step: "Step 4",
            title: "発注者からの接点要求（承認制）",
          },
        },
      },
    },
    faq: {
      eyebrow: "FAQ",
      title: "よくある質問",
      free: {
        question: "掲載は無料ですか？",
        answer:
          "掲載は無料です。アポイント獲得で料金が発生します。",
      },
      privateSettings: {
        question: "実績は非公開設定できますか？",
        answer: "一部非公開設定も可能です。",
      },
      requestApproval: {
        question: "接点要求は断れますか？",
        answer: "承認制のため、選択可能です。",
      },
      technicalDisclosure: {
        question: "技術情報はどこまで公開されますか？",
        answer: "公開範囲は投稿時に設定できます。",
      },
    },
    finalCta: {
      eyebrow: "Start With One Case Study",
      title: "まずは1件、実績を公開してみませんか？",
      primaryCta: "無料で掲載を始める",
      secondaryCta: "サービス資料を請求する",
    },
    form: {
      eyebrow: "Document Download Form",
      title: "資料請求フォーム",
      description:
        "サービス資料の請求に必要な情報をご入力ください。",
      companyName: "貴社名",
      contactName: "担当者名",
      jobTitle: "役職",
      email: "email",
      phone: "電話",
      referralSource: "どこで知りましたか",
      details: "内容",
      submit: "サービス資料を請求する",
      optional: "任意",
      placeholders: {
        companyName: "株式会社サンプル",
        contactName: "山田 太郎",
        jobTitle: "営業企画部 マネージャー",
        email: "example@company.co.jp",
        phone: "03-1234-5678",
        referralSource: "検索、紹介、展示会など",
        details: "ご相談内容や事前に知りたい点があればご記入ください",
      },
    },
    validation: {
      required: "必須項目です。",
      email: "メールアドレスの形式が正しくありません。",
    },
  },
};

export default translations;
