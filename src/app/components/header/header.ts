import { Component } from '@angular/core';
import {SearchBar} from '../search-bar/search-bar';
import {MenuNavbar} from '../menu-navbar/menu-navbar';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [
    SearchBar,
    MenuNavbar,
    RouterLink
  ],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

}
