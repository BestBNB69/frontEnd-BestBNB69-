import { Component } from '@angular/core';
import {SearchBar} from '../search-bar/search-bar';
import {MenuNavbar} from '../menu-navbar/menu-navbar';
import {RouterLink} from '@angular/router';
import {NgIf} from '@angular/common';
import {CreateListingModal} from '../listing/create-listing-modal/create-listing-modal';

@Component({
  selector: 'app-header',
  imports: [
    SearchBar,
    MenuNavbar,
    RouterLink,
    NgIf,
    CreateListingModal
  ],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
 public showCreateListing = false;

  public openCreateListing() {
    this.showCreateListing = true;
  }
}
