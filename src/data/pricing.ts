export const pricingData = {
  TELEPHONE: {
    APPLE: [
      {
    model: "IPHONE X",
    sections: [
      {
        title: "Interventions classiques",
        items: [
          { label: "Ecran", price: "169€" },
          { label: "Batterie", price: "129€" },
          { label: "Connecteur de charge", price: "149€" },
          { label: "Caméra Avant", price: "99€" },
          { label: "Caméra Arrière", price: "109€" },
          { label: "Lentille Caméra", price: "69€" },
          { label: "Remplacement chassi", price: "139€" },
          { label: "face ID (selon panne)", price: "entre 89€ et 109€" },
          { label: "restauration mise a jour", price: "20€" },
        ],
      },
      {
        title: "Interventions sur carte mère",
        items: [
          { label: "Toutes pannes sur carte mère", price: "299€" },
          { label: "lecteur sim", price: "A partir de 429€" },
        ],
      },
      {
        title: "Récuperation de données",
        items: [
          { label: "Carte mère HS", price: "" },
        ],
      },
      {
        title: " ",
        items: [
          { label: "effacement de données certifié", price: "20€" },
        ],
      },
    ],
  },
      {
        model: "IPHONE 11",
        sections: [
          {
            title: "RÉPARATIONS",
            items: [
              { label: "Écran", price: "109€" },
              { label: "Batterie", price: "69€" },
              { label: "Connecteur de charge", price: "79€" },
            ],
          },
        ],
      },
    ],

    SAMSUNG: [
      {
        model: "GALAXY S21",
        sections: [
          {
            title: "RÉPARATIONS",
            items: [
              { label: "Écran", price: "149€" },
              { label: "Batterie", price: "79€" },
            ],
          },
        ],
      },
    ],
  },

  TABLETTE: {
    APPLE: [
      {
        model: "IPAD 9",
        sections: [
          {
            title: "RÉPARATIONS",
            items: [
              { label: "Écran", price: "129€" },
              { label: "Batterie", price: "89€" },
            ],
          },
        ],
      },
    ],
  },
} as const;