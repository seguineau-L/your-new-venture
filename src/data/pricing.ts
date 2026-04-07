export type Category = "TELEPHONE" | "ORDINATEUR" | "CONSOLE" | "TABLETTE" | "ECOUTEURS";
export type Brand = "APPLE" | "ANDROID";

export interface PriceItem {
  label: string;
  price: string;
}

export interface PriceSection {
  title: string;
  items: PriceItem[];
}

export interface ModelPricing {
  model: string;
  sections: PriceSection[];
}

export interface BrandPricing {
  brand: Brand;
  models: ModelPricing[];
}

export const applePricing: ModelPricing[] = [
  {
    model: "IPHONE 16",
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
          { label: "Face ID (selon panne)", price: "entre 89€ et 109€" },
          { label: "Restauration mise a jour", price: "20€" },
        ],
      },
      {
        title: "Interventions sur carte mère",
        items: [
          { label: "Toutes pannes sur carte mère", price: "299€" },
          { label: "Lecteur sim", price: "A partir de 429€" },
        ],
      },
      {
        title: "Récuperation de données",
        items: [
          { label: "Carte mère HS", price: "Sur devis" },
          { label: "Effacement de données certifié", price: "20€" },
        ],
      },
    ],
  },
  {
    model: "IPHONE 16 PLUS",
    sections: [
      {
        title: "Interventions classiques",
        items: [
          { label: "Ecran", price: "189€" },
          { label: "Batterie", price: "129€" },
          { label: "Connecteur de charge", price: "149€" },
          { label: "Caméra Avant", price: "99€" },
          { label: "Caméra Arrière", price: "119€" },
          { label: "Lentille Caméra", price: "69€" },
          { label: "Remplacement chassi", price: "149€" },
          { label: "Face ID (selon panne)", price: "entre 89€ et 109€" },
          { label: "Restauration mise a jour", price: "20€" },
        ],
      },
      {
        title: "Interventions sur carte mère",
        items: [
          { label: "Toutes pannes sur carte mère", price: "299€" },
          { label: "Lecteur sim", price: "A partir de 429€" },
        ],
      },
      {
        title: "Récuperation de données",
        items: [
          { label: "Carte mère HS", price: "Sur devis" },
          { label: "Effacement de données certifié", price: "20€" },
        ],
      },
    ],
  },
  {
    model: "IPHONE 16 PRO",
    sections: [
      {
        title: "Interventions classiques",
        items: [
          { label: "Ecran", price: "219€" },
          { label: "Batterie", price: "139€" },
          { label: "Connecteur de charge", price: "159€" },
          { label: "Caméra Avant", price: "109€" },
          { label: "Caméra Arrière", price: "139€" },
          { label: "Lentille Caméra", price: "79€" },
          { label: "Remplacement chassi", price: "159€" },
          { label: "Face ID (selon panne)", price: "entre 89€ et 119€" },
          { label: "Restauration mise a jour", price: "20€" },
        ],
      },
      {
        title: "Interventions sur carte mère",
        items: [
          { label: "Toutes pannes sur carte mère", price: "349€" },
          { label: "Lecteur sim", price: "A partir de 449€" },
        ],
      },
      {
        title: "Récuperation de données",
        items: [
          { label: "Carte mère HS", price: "Sur devis" },
          { label: "Effacement de données certifié", price: "20€" },
        ],
      },
    ],
  },
  {
    model: "IPHONE 16 PRO MAX",
    sections: [
      {
        title: "Interventions classiques",
        items: [
          { label: "Ecran", price: "249€" },
          { label: "Batterie", price: "139€" },
          { label: "Connecteur de charge", price: "169€" },
          { label: "Caméra Avant", price: "109€" },
          { label: "Caméra Arrière", price: "149€" },
          { label: "Lentille Caméra", price: "79€" },
          { label: "Remplacement chassi", price: "169€" },
          { label: "Face ID (selon panne)", price: "entre 99€ et 129€" },
          { label: "Restauration mise a jour", price: "20€" },
        ],
      },
      {
        title: "Interventions sur carte mère",
        items: [
          { label: "Toutes pannes sur carte mère", price: "349€" },
          { label: "Lecteur sim", price: "A partir de 449€" },
        ],
      },
      {
        title: "Récuperation de données",
        items: [
          { label: "Carte mère HS", price: "Sur devis" },
          { label: "Effacement de données certifié", price: "20€" },
        ],
      },
    ],
  },
  {
    model: "IPHONE 16 E",
    sections: [
      {
        title: "Interventions classiques",
        items: [
          { label: "Ecran", price: "149€" },
          { label: "Batterie", price: "119€" },
          { label: "Connecteur de charge", price: "139€" },
          { label: "Caméra Avant", price: "89€" },
          { label: "Caméra Arrière", price: "99€" },
          { label: "Lentille Caméra", price: "59€" },
          { label: "Remplacement chassi", price: "129€" },
          { label: "Face ID (selon panne)", price: "entre 79€ et 99€" },
          { label: "Restauration mise a jour", price: "20€" },
        ],
      },
      {
        title: "Interventions sur carte mère",
        items: [
          { label: "Toutes pannes sur carte mère", price: "279€" },
          { label: "Lecteur sim", price: "A partir de 399€" },
        ],
      },
      {
        title: "Récuperation de données",
        items: [
          { label: "Carte mère HS", price: "Sur devis" },
          { label: "Effacement de données certifié", price: "20€" },
        ],
      },
    ],
  },
];

export const androidPricing: ModelPricing[] = [
  {
    model: "SAMSUNG GALAXY S24",
    sections: [
      {
        title: "Interventions classiques",
        items: [
          { label: "Ecran", price: "199€" },
          { label: "Batterie", price: "99€" },
          { label: "Connecteur de charge", price: "119€" },
          { label: "Caméra Avant", price: "79€" },
          { label: "Caméra Arrière", price: "99€" },
          { label: "Restauration mise a jour", price: "20€" },
        ],
      },
      {
        title: "Interventions sur carte mère",
        items: [
          { label: "Toutes pannes sur carte mère", price: "Sur devis" },
        ],
      },
    ],
  },
  {
    model: "SAMSUNG GALAXY S24+",
    sections: [
      {
        title: "Interventions classiques",
        items: [
          { label: "Ecran", price: "229€" },
          { label: "Batterie", price: "109€" },
          { label: "Connecteur de charge", price: "129€" },
          { label: "Caméra Avant", price: "89€" },
          { label: "Caméra Arrière", price: "109€" },
          { label: "Restauration mise a jour", price: "20€" },
        ],
      },
      {
        title: "Interventions sur carte mère",
        items: [
          { label: "Toutes pannes sur carte mère", price: "Sur devis" },
        ],
      },
    ],
  },
];

export const categories: Category[] = ["TELEPHONE", "ORDINATEUR", "CONSOLE", "TABLETTE", "ECOUTEURS"];
export const brands: Brand[] = ["APPLE", "ANDROID"];
