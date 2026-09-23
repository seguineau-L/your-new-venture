export const pricingData = {
  TELEPHONE: {
    APPLE: [
      {
    model: "IPHONE X",
    sections: [
      {
        title: "Interventions classiques",
        items: [
          { label: "Ecran", price: "Tarif à venir" },
          { label: "Batterie", price: "Tarif à venir" },
          { label: "Connecteur de charge", price: "Tarif à venir" },
          { label: "Caméra Avant", price: "Tarif à venir" },
          { label: "Caméra Arrière", price: "Tarif à venir" },
          { label: "Lentille Caméra", price: "Tarif à venir" },
          { label: "Remplacement chassi", price: "Tarif à venir" },
          { label: "face ID (selon panne)", price: "Tarif à venir" },
          { label: "restauration mise a jour", price: "Tarif à venir" },
        ],
      },
      {
        title: "Interventions sur carte mère",
        items: [
          { label: "Toutes pannes sur carte mère", price: "Tarif à venir" },
          { label: "lecteur sim", price: "Tarif à venir" },
        ],
      },
      {
        title: "Récuperation de données",
        items: [
          { label: "Carte mère HS", price: "Tarif à venir" },
        ],
      },
      {
        title: " ",
        items: [
          { label: "effacement de données certifié", price: "Tarif à venir" },
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
              { label: "Écran", price: "Tarif à venir" },
              { label: "Batterie", price: "Tarif à venir" },
              { label: "Connecteur de charge", price: "Tarif à venir" },
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
              { label: "Écran", price: "Tarif à venir" },
              { label: "Batterie", price: "Tarif à venir" },
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
              { label: "Écran", price: "Tarif à venir" },
              { label: "Batterie", price: "Tarif à venir" },
            ],
          },
        ],
      },
    ],
  },
} as const;