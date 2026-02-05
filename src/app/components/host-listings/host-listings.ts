import { ChangeDetectorRef, Component, signal } from '@angular/core';
import { ListingDialog } from '../listing-dialog/listing-dialog';
import { ListingsModel } from '../../models/listings-model';
import { ListingsService } from '../../services/listings/listings-service';

@Component({
  selector: 'app-host-listings',
  imports: [ListingDialog],
  templateUrl: './host-listings.html',
  styleUrl: './host-listings.css',
})
export class HostListings {
  editPopup = signal(false)
  listingAnnoucement: ListingsModel[] = [];
  loading = true
  error = false

  constructor(
    private readonly listingsService: ListingsService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.loadListing();
  }

  loadListing() {
    this.listingsService.getDashListings().subscribe(res => {
      this.listingAnnoucement = res;
      this.listingAnnoucement.forEach(element => {
        element.updatedAt = new Date(element.updatedAt).toLocaleString()
      });
      this.loading = false;
      this.cdr.detectChanges();
      console.log(this.listingAnnoucement)
    });
  }
  public openCreate() {
    this.editPopup.set(true)
  }
  public closeCreate() {
    this.editPopup.set(false)
  }
}
