import { Component, Host, signal } from '@angular/core';
import { HostLayout } from '../../components/host-layout/host-layout';
import { HostDashboard } from '../../components/host-dashboard/host-dashboard';
import { HostUser } from '../../components/host-user/host-user';
import { HostListings } from '../../components/host-listings/host-listings';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { ListingDialog } from '../../components/listing-dialog/listing-dialog';

@Component({
  selector: 'app-host-home',
  imports: [HostDashboard, HostLayout, HostUser, HostListings],
  templateUrl: './host-home.html',
  styleUrl: './host-home.css',
})
export class HostHome {
  Dashboards = signal(false);
  Listings = signal(false);
  Users = signal(false);
  section = '';
  constructor(private router: Router) {
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        if (event.url.includes('dashboard')) this.section = 'dashboard';
        if (event.url.includes('listings')) this.section = 'listings';
        if (event.url.includes('users')) this.section = 'users';
      });
  }
  // constructor(private dialog: MatDialog){}
  ngOnInit() {
    console.log(this.section)
    // this.Dashboards.set(false)
    // this.Listings.set(false)
    // this.Users.set(false)
    if (this.section == "dashboard") {
      this.Dashboards.set(true)
    } else if (this.section == "listings") {
      this.Listings.set(true)
    } else if (this.section == "users") {
      this.Users.set(true)
    }
  }
  openCreate(): void {

  }
}
