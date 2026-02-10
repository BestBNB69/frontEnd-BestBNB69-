import { ChangeDetectorRef, Component, signal } from '@angular/core';
import { ListingDialog } from '../listing-dialog/listing-dialog';
import { ListingsModel } from '../../models/listings-model';
import { ListingsService } from '../../services/listings/listings-service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {ListingsDTO} from '../../models/listingsDTO';

@Component({
  selector: 'app-host-listings',
  imports: [ListingDialog],
  templateUrl: './host-listings.html',
  styleUrl: './host-listings.css',
})
export class HostListings {
  editPopup = signal(false)
  listingAnnoucement: ListingsDTO[] = [];
  loading = true
  error = false
  isEdit = false;
  selectedListing: any

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
        if (element.updatedAt) {
          element.updatedAt = new Date(element.updatedAt).toLocaleString();
        }
      });
      this.loading = false;
      this.cdr.detectChanges();
      console.log(this.listingAnnoucement)
    });
  }
  openCreate() {
    this.isEdit = false;
    this.selectedListing = null;
    this.editPopup.set(true);
  }

  openEdit(listing: any) {
    this.isEdit = true;
    this.selectedListing = {
      id: listing.id,
      title: listing.title,
      description: listing.description,
      city: listing.city,
      country: listing.country,
      address: listing.address,
      postal: listing.postalCode,
      price: listing.pricePerNight,
      max: 0,
      size: listing.surface,
    };
    this.editPopup.set(true);
  }

  closeCreate() {
    this.editPopup.set(false);
  }

  public delete(id: string) {
    this.loading = true;
    this.listingsService.deleteListing(id).subscribe(res => {
      console.log(res)
    });
    this.loadListing()
  }
}
