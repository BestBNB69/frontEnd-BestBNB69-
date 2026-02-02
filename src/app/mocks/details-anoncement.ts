import { DetailsAnnoucement } from '../models/details-annoucement';

export const DETAILS_ANNONCEMENT: DetailsAnnoucement[] = [
  {
    id: 1,
    title: "Appartement lumineux à Paris",
    description: "Appartement moderne avec 2 chambres, proche du centre-ville",
    price: 80,
    capacity: 4,
    type: "Appartement",
    city: "Paris",
    country: "France",
    images: ["img01.png", "img02.jpg"],
    availability: [
      { date: "2026-01-15", available: true },
      { date: "2026-01-16", available: false },
      { date: "2026-01-17", available: true }
    ]
  },
  {
    id: 2,
    title: "Maison avec jardin à Lyon",
    description: "Maison spacieuse avec jardin et terrasse",
    price: 120,
    capacity: 6,
    type: "Maison",
    city: "Lyon",
    country: "France",
    images: ["img01.png", "img02.jpg"],
    availability: [
      { date: "2026-01-15", available: true },
      { date: "2026-01-16", available: true },
      { date: "2026-01-17", available: false }
    ]
  }
];
