import { Component } from '@angular/core';
import {SearchBar} from '../search-bar/search-bar';
import {MenuNavbar} from '../menu-navbar/menu-navbar';

@Component({
  selector: 'app-header',
  imports: [
    SearchBar,
    MenuNavbar
  ],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

}
