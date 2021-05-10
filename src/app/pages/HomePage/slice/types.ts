/* --- STATE --- */
export interface Listing {
  overview: {
    price: string;
    beds: number;
    baths: number;
    neighborhood: string;
    address: string;
    city: string;
    zipcode: number;
    available: boolean;
  };
  facts: {
    type: string;
    yearBuilt: number;
    heating: string;
    parking: string;
    lot: string;
    stories: number;
  };
  others: {
    anualTax: number;
    hasGarage: boolean;
    pool: boolean;
    virtualTourLink: string;
    parcelNumber: number;
    lastSold: string;
  };
  visits: {
    total: number;
    lastVisited: string;
  };
  homeImage: string;
  id: number;
  images: string[];
}

export interface HomePageState {
  listings: Listing[];
}

export type ContainerState = HomePageState;
