import {Component, Input} from '@angular/core';
import {categories} from '../../models/categories';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-categories',
  imports: [
    NgClass
  ],
  templateUrl: './categories.html',
  styleUrl: './categories.css',
})
export class Categories {
  @Input() categories: categories[] = [];

}
