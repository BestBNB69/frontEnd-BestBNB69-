import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-listing-galery',
  imports: [],
  templateUrl: './listing-galery.html',
  styleUrl: './listing-galery.css',
})
export class ListingGalery {
  @Input() images: string[] = [];
}
