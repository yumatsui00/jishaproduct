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
      title: "Jisha project has started.",
      description:
        "This is the initial top page for the Next.js application.",
    },
  },
};

export default translations;
