import { Component } from '@angular/core';
import { categories } from '../../models/categories';
import { SearchDestination } from '../../components/search-destination/search-destination';
import { ListingAnnoucement } from '../../components/listing-annoucement/listing-annoucement';
import { ListingAnnoucementModel } from '../../models/listing-annoucement-model';
import { Categories } from '../../components/categories/categories';
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
  categories: categories[] = [
    { name: 'Plage', icone: '🏖️', first: true },
    { name: 'Montagne', icone: '🏔️' },
    { name: 'Campagne', icone: '🏡' },
    { name: 'Ville', icone: '🏙️' },
    { name: 'Historique', icone: '🏰' },
    { name: 'Luxe', icone: '✨' },
    { name: 'Cabane', icone: '🌲' },
    { name: 'Piscine', icone: '🏊' },
  ]

  listing_annoucement: ListingAnnoucementModel[] = [
    { picture: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=600', city: 'Nice, France', rating: 4.95, icone: '⭐', description: 'Villa avec vue mer', date: '15-20 mai', price: 250 },
    { picture: '', city: '', rating: 0, icone: '', description: '', date: '', price: 0 },
    { picture: '', city: '', rating: 0, icone: '', description: '', date: '', price: 0 },
    { picture: '', city: '', rating: 0, icone: '', description: '', date: '', price: 0 },
    { picture: '', city: '', rating: 0, icone: '', description: '', date: '', price: 0 },
    { picture: '', city: '', rating: 0, icone: '', description: '', date: '', price: 0 }
  ]

}
