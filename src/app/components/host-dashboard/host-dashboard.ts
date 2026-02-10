import { ChangeDetectorRef, Component } from '@angular/core';
import { ListingsModel } from '../../models/listings-model';
import { ListingsService } from '../../services/listings/listings-service';
import {DetailsAnnoucement} from '../../models/details-annoucement';

@Component({
  selector: 'app-host-dashboard',
  imports: [],
  templateUrl: './host-dashboard.html',
  styleUrl: './host-dashboard.css',
})
export class HostDashboard {
  listingAnnoucement: DetailsAnnoucement[] = [];
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
    this.listingsService.getAllListings().subscribe(res => {
      this.listingAnnoucement = res;
      this.loading = false;
      this.cdr.detectChanges();
    });
  }
}
