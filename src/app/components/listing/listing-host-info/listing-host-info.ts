import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-listing-host-info',
  imports: [],
  templateUrl: './listing-host-info.html',
  styleUrl: './listing-host-info.css',
})
export class ListingHostInfo {
  @Input() type: string = '';
  @Input() hostName: string = '';
  @Input() capacity: number = 0;
  @Input() bedrooms: number = 0;
  @Input() beds: number = 0;
  @Input() bathrooms: number = 0;
}
