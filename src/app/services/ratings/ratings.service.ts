import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RatingsService {
  private apiUrl = 'http://localhost:5235/api/ratings';

  constructor(private http: HttpClient) {}

  getListingComments(listingId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/listing/${listingId}`);
  }

  createComment(data: {
    listingId: string;
    content: string;
    score: number;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/comment`, data);
  }

  createReply(data: {
    listingId: string;
    parentCommentId: string;
    content: string;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/comment/reply`, data);
  }
}
