import {Review} from '../models/reviews';

export const FAKE_REVIEWS: Review[] = [
  {
    id: '1',
    user: {
      name: 'Sophie',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    rating: 5,
    content:
      "Logement parfait pour un séjour à Marrakech. L'emplacement est idéal et l'hôte très réactive.",
    createdAt: new Date('2026-02-10'),
  },
  {
    id: '2',
    user: {
      name: 'Lucas',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    rating: 4,
    content:
      'Appartement très propre et bien situé. Petit bémol sur le bruit le soir.',
    createdAt: new Date('2026-01-28'),
  },
  {
    id: '3',
    user: {
      name: 'Nadia',
      avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
    },
    rating: 5,
    content:
      'Séjour incroyable ! Tout était conforme aux photos. Je recommande à 100%.',
    createdAt: new Date('2026-01-15'),
  },
  {
    id: '4',
    user: {
      name: 'Yassine',
      avatar: 'https://randomuser.me/api/portraits/men/71.jpg',
    },
    rating: 5,
    content:
      'Hôte très accueillant, logement calme et confortable. Rien à redire.',
    createdAt: new Date('2025-12-22'),
  },
  {
    id: '5',
    user: {
      name: 'Claire',
      avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
    },
    rating: 4,
    content:
      'Très bon rapport qualité/prix. Le check-in était simple et rapide.',
    createdAt: new Date('2025-12-10'),
  },
  {
    id: '6',
    user: {
      name: 'Mehdi',
      avatar: 'https://randomuser.me/api/portraits/men/18.jpg',
    },
    rating: 5,
    content:
      "Excellent séjour, je reviendrai sans hésiter lors de mon prochain passage.",
    createdAt: new Date('2025-11-30'),
  },
];
