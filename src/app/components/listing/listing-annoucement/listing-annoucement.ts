import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { ListingAnnoucementModel } from '../../../models/listing-annoucement-model';
import { ListingsService } from '../../../services/listings/listings-service';
import { ListingsModel } from '../../../models/listings-model';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listing-annoucement',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './listing-annoucement.html',
  styleUrl: './listing-annoucement.css',
})
export class ListingAnnoucement {
  listingAnnoucement: ListingsModel[] = [];
  loading = true
  error = false

  constructor(
    private readonly listingsService: ListingsService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.loadListing();
  }

  loadListing() {
    this.listingsService.getAllListings().subscribe(res => {
      this.listingAnnoucement = res;
      this.loading = false;
      this.cdr.detectChanges();
      console.log(res)
    });
  }

  detailsButton(id: string) {
    this.router.navigate([`/listings/${id}`]);
  }
}
