import { Component } from '@angular/core';
import {FAKE_REVIEWS} from '../../../mocks/reviews.fake';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-listing-comment',
  imports: [
    DatePipe
  ],
  templateUrl: './listing-comment.html',
  styleUrl: './listing-comment.css',
})
export class ListingComment {
  reviews = FAKE_REVIEWS;

  get averageRating(): number {
    const total = this.reviews.reduce((sum, r) => sum + r.rating, 0);
    return +(total / this.reviews.length).toFixed(2);
  }
}
