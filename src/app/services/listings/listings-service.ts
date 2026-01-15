import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ListingsService {
  private apiUrl = 'http://localhost:8080/api/listings';
  private jsonUrl = 'details.json';
  constructor(private http: HttpClient) { }

  getAllListings(): Observable<any[]> {
    return this.http.get<any[]>(this.jsonUrl);
  }

  getListing(id: string): Observable<any> {
    // return this.http.get(`${this.apiUrl}/${id}`);
    return this.getAllListings().pipe(
      map(listings => listings.find(listing => listing.id === id))
    );
  }
}
