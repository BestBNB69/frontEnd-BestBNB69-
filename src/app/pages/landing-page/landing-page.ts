import { Component } from '@angular/core';
import {categories} from '../../models/categories';
import {SearchDestination} from '../../components/search-destination/search-destination';
import {ListingAnnoucement} from '../../components/listing-annoucement/listing-annoucement';
import {ListingAnnoucementModel} from '../../models/listing-annoucement-model';
import {Categories} from '../../components/categories/categories';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';

@Component({
  selector: 'app-landing-page',
  imports: [
    SearchDestination,
    ListingAnnoucement,
    Categories,
    Header,
    Footer
  ],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.css',
})
export class LandingPage {
  categories : categories[] = [
    {name: 'Plage', icone: '🏖️', first: true},
    {name: 'Montagne', icone: '🏔️'},
    {name: 'Campagne', icone: '🏡'},
    {name: 'Ville', icone: '🏙️'},
    {name: 'Historique', icone: '🏰'},
    {name: 'Luxe', icone: '✨'},
    {name: 'Cabane', icone: '🌲'},
    {name: 'Piscine', icone: '🏊'},
  ]

  listing_annoucement : ListingAnnoucementModel[] = [
    {picture: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=600', City: 'Nice, France', rating: 4.95, icone: '⭐', Description: 'Villa avec vue mer', Date: '15-20 mai', Price: 250, Country:"France" },
    {picture: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600',  City: 'Lyon, France', rating: 4.87, icone: '⭐', Description: 'Appartement moderne', Date: '22-27 mai', Price: 120, Country:"France" },
    {picture: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600',  City: 'Paris, France', rating: 5.0, icone: '⭐', Description: 'Loft design centre ville', Date: '1-6 juin', Price: 180,Country:"France" },
    {picture: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600',  City: 'Chamonix, France', rating: 4.92, icone: '⭐', Description: 'Chalet montagne 8 pers', Date: '10-15 juin', Price: 320,Country:"France" },
    {picture: 'https://images.unsplash.com/photo-1602941525421-8f8b81d3edbb?w=600',  City: 'Marseille, France', rating: 4.78, icone: '⭐', Description: 'Studio plage Vieux-Port', Date: '18-23 juin', Price: 95, Country:"France" },
    {picture: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600',  City: 'Bordeaux, France', rating: 4.89, icone: '⭐', Description: 'Maison vignoble', Date: '25-30 juin', Price: 200, Country:"France" }
  ]

}
