import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { ListingAnnoucementModel } from '../../../models/listing-annoucement-model';
import { ListingsService } from '../../../services/listings/listings-service';
import { ListingsModel } from '../../../models/listings-model';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { photoModel } from '../../../models/photos';

@Component({
  selector: 'app-listing-annoucement',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './listing-annoucement.html',
  styleUrl: './listing-annoucement.css',
})
export class ListingAnnoucement {
  listingAnnoucement: ListingsModel[] = [];
  photos: photoModel | undefined;
  private Url = 'http://localhost:5235';
  loading = true
  error = false
  three = "..."

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
      this.listingAnnoucement.forEach(element => {
        if (element.photos && element.photos.length > 0) {
          element.photos[0].imageUrl = this.Url + element.photos[0].imageUrl
          // console.log(element.photos[0].imageUrl)
        }
      });
      this.loading = false;
      this.cdr.detectChanges();
      // console.log(res)
    });
  }

  detailsButton(id: string) {
    this.router.navigate([`/listings/${id}`]);
  }
}
