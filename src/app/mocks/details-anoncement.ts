import { DetailsAnnoucement } from '../models/details-annoucement';

export const DETAILS_ANNONCEMENT: DetailsAnnoucement[] = [
  {
    id: 1,
    title: "Appartement lumineux à Paris",
    type: "Appartement",
    city: "Paris",
    country: "France",
    price: 80,
    capacity: 4,

    bedrooms: 2,
    beds: 3,
    bathrooms: 1,

    description: "Appartement moderne avec 2 chambres, proche du centre-ville.",

    images: [
      "img01.png",
      "img02.jpg",
      "img03.jpg",
      "img04.jpg",
      "img05.jpg"
    ],

    averageRating: 4.89,
    totalReviews: 127,

    availability: [
      { date: "2026-01-15", available: true },
      { date: "2026-01-16", available: false },
      { date: "2026-01-17", available: true }
    ],

    amenities: [
      { id: 1, name: "Wifi", icon: "wifi", available: true },
      { id: 2, name: "Cuisine", icon: "kitchen", available: true },
      { id: 3, name: "Climatisation", icon: "ac", available: true },
      { id: 4, name: "Détecteur de fumée", icon: "smoke", available: false }
    ],

    hostInfo: {
      hostId: "kldksllds",
      hostName: "Marie",
      hostEmail: "",
      photo: "https://via.placeholder.com/112",
      joinedYear: 2019,
      isVerified: true,
      totalReviews: 378,
      bio: "any ccccc"
    },

    rules: {
      checkIn: "15:00",
      checkOut: "11:00",
      maxGuests: 4,
      cancellationPolicy: "Annulation gratuite avant le 8 mars",
      houseRules: [
        "Pas de fête",
        "Pas d’animaux",
        "Non-fumeur"
      ],
      safetyRules: [
        "Détecteur de fumée",
        "Détecteur de monoxyde de carbone"
      ]
    },
    ratings: 4.85
  }
];
