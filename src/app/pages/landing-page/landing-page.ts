import { Component } from '@angular/core';
import {Categories} from '../../components/categories/categories';
import {SearchDestination} from '../../components/search-destination/search-destination';
import {ListingAnnoucement} from '../../components/listing-annoucement/listing-annoucement';

@Component({
  selector: 'app-landing-page',
  imports: [
    Categories,
    SearchDestination,
    ListingAnnoucement
  ],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.css',
})
export class LandingPage {

}
