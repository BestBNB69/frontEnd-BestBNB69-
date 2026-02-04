import { Component } from '@angular/core';
import { Authservice } from '../../services/authservice/authservice';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-host-layout',
  imports: [RouterModule],
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
