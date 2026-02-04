import {Component, Input} from '@angular/core';
import {ListingAnnoucementModel} from '../../../models/listing-annoucement-model';

@Component({
  selector: 'app-listing-annoucement',
  imports: [],
  templateUrl: './listing-annoucement.html',
  styleUrl: './listing-annoucement.css',
})
export class ListingAnnoucement {
  @Input() listingAnnoucement: ListingAnnoucementModel[] = [];

}
