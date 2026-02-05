import { Component, signal } from '@angular/core';
import { ListingDialog } from '../listing-dialog/listing-dialog';

@Component({
  selector: 'app-host-listings',
  imports: [ListingDialog],
  templateUrl: './host-listings.html',
  styleUrl: './host-listings.css',
})
export class HostListings {
  editPopup = signal(false)
  public openCreate() {
    this.editPopup.set(true)
  }
  public closeCreate() {
    this.editPopup.set(false)
  }
}
