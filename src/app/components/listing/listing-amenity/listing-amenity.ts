import {Component, Input} from '@angular/core';
import {Amenity, DetailsAnnoucement} from '../../../models/details-annoucement';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-listing-amenity',
  imports: [
    MatIcon
  ],
  templateUrl: './listing-amenity.html',
  styleUrl: './listing-amenity.css',
})
export class ListingAmenity {
  @Input() amenities: DetailsAnnoucement | null = null;

}
