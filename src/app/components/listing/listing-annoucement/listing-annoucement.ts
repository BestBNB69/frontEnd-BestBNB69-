import { Component, Input } from '@angular/core';
import { ListingAnnoucementModel } from '../../../models/listing-annoucement-model';
import { ListingsService } from '../../../services/listings/listings-service';
import { ListingsModel } from '../../../models/listings-model';

@Component({
  selector: 'app-listing-annoucement',
  imports: [],
  templateUrl: './listing-annoucement.html',
  styleUrl: './listing-annoucement.css',
})
export class ListingAnnoucement {
  listingAnnoucement: ListingsModel[] = [];
  loading = true
  error = false

  constructor(
    // private readonly route: ActivatedRoute,
    private readonly listingsService: ListingsService
  ) { }

  ngOnInit() {
    this.loadListing();
  }

  loadListing() {
    this.listingsService.getAllListings().subscribe(res => {
      this.listingAnnoucement = res;
      this.loading = false;
      console.log(res)
    });
  }
}
