interface HomePageTranslations {
  common: {
    topBar: {
      vendorLinkLabel: string;
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
