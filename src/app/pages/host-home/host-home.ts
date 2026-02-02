import { Component, Host, signal } from '@angular/core';
import { HostLayout } from '../../components/host-layout/host-layout';
import { HostDashboard } from '../../components/host-dashboard/host-dashboard';
import { HostUser } from '../../components/host-user/host-user';
import { HostListings } from '../../components/host-listings/host-listings';

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

  ngOnInit(): void {

  }
}
