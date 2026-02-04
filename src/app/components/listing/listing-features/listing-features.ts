import { Component } from '@angular/core';
import {Feature} from '../../../models/features';

@Component({
  selector: 'app-listing-features',
  imports: [],
  templateUrl: './listing-features.html',
  styleUrl: './listing-features.css',
})
export class ListingFeatures {
  features: Feature[] = [
    {
      icon: 'home',
      title: 'Logement entier',
      description: 'Vous aurez le logement rien que pour vous.'
    },
    {
      icon: 'check',
      title: 'Emplacement exceptionnel',
      description: '100 % des voyageurs récents ont attribué 5 étoiles à l\'emplacement.'
    },
    {
      icon: 'key',
      title: 'Arrivée autonome',
      description: 'Vous pouvez faire l\'arrivée de manière autonome avec le boîtier à clés.'
    },
    {
      icon: 'calendar',
      title: 'Annulation gratuite avant le 8 mars',
      description: 'Obtenez un remboursement intégral si vous changez d\'avis.'
    }
  ];
}
