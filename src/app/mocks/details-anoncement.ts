import { DetailsAnnoucement } from '../models/details-annoucement';

export const DETAILS_ANNONCEMENT: DetailsAnnoucement[] = [
  {
    id: "1",
    title: "Appartement lumineux à Paris",
    type: "Appartement",
    city: "Paris",
    country: "France",
    pricePerNight: 80,
    capacity: 4,

    bedrooms: 2,
    beds: 3,
    bathrooms: 1,

    description: "Appartement moderne avec 2 chambres, proche du centre-ville.",

    photos: [
      {
        createdAt: "",
        id: "",
        imageUrl: "img01.png",
        isCover: true,
        listingId: "",
        order: 0
      },
      {
        createdAt: "",
        id: "",
        imageUrl: "img02.jpg",
        isCover: true,
        listingId: "",
        order: 0
      },
      {
        createdAt: "",
        id: "",
        imageUrl: "img03.jpg",
        isCover: true,
        listingId: "",
        order: 0
      },
      {
        createdAt: "",
        id: "",
        imageUrl: "img04.jpg",
        isCover: true,
        listingId: "",
        order: 0
      },
      {
        createdAt: "",
        id: "",
        imageUrl: "img05.jpg",
        isCover: true,
        listingId: "",
        order: 0
      }

    ],

    averageRating: 4.89,
    totalReviews: 127,

    availability: [
      { date: "2026-01-15", available: true },
      { date: "2026-01-16", available: false },
      { date: "2026-01-17", available: true }
    ],

    amenities: [
      { name: "Wifi", icon: "perm_scan_wififi" },
      { name: "Cuisine", icon: "kitchen" },
      { name: "TV", icon: "tv" },
      { name: "Parking", icon: "local_parking" },
      { name: "Climatisation", icon: "toys", },
      { name: "Non fumeur", icon: "smoke_free", }
    ],

    hostInfo: {
      hostId: "kldksllds",
      hostName: "Marie",
      hostEmail: "",
      photo: "https://via.placeholder.com/112",
      joinedYear: "2019",
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
