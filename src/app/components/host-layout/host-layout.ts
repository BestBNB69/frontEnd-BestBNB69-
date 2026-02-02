import { Component } from '@angular/core';
import { Authservice } from '../../services/authservice/authservice';

@Component({
  selector: 'app-host-layout',
  imports: [],
  templateUrl: './host-layout.html',
  styleUrl: './host-layout.css',
})
export class HostLayout {
  constructor(
    private auth: Authservice
  ) { }

  logout() {
    this.auth.logout()
  }
}
