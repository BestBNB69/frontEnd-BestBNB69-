import { Component } from '@angular/core';
import { ListingDetails } from '../../components/listing-details/listing-details';

@Component({
  selector: 'app-listing',
  imports: [ListingDetails],
  templateUrl: './listing.html',
  styleUrl: './listing.css',
})
export class Listing {

}
