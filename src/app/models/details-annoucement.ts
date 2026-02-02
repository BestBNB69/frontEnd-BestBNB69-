export interface DetailsAnnoucement {
  id: number;
  title: string;
  description: string;
  price: number;
  capacity: number;
  type: string;
  city: string
  country: string;
  images : string[];
  availability:Availability[]
}

export interface Availability {
  date: string;
  available: boolean;
}
