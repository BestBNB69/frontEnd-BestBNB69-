import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map, Observable, of} from 'rxjs';
import {DetailsAnnoucement} from '../../models/details-annoucement';
import {DETAILS_ANNONCEMENT} from '../../mocks/details-anoncement';

@Injectable({
  providedIn: 'root',
})
export class ListingsService {
  private apiUrl = 'http://localhost:8080/api/listings';
  constructor(private http: HttpClient) { }

  /*getAllListings(): Observable<any[]> {
    return this.http.get<any[]>(this.jsonUrl);
  }
*/
  /*getListing(id: string): Observable<any> {
    // return this.http.get(`${this.apiUrl}/${id}`);
    return this.getAllListings().pipe(
      map(listings => listings.find(listing => listing.id === id))
    );
  }*/

  getAllListings(): Observable<DetailsAnnoucement[]> {
    return  of(DETAILS_ANNONCEMENT);
  }

  getListing(id: number): Observable<DetailsAnnoucement | undefined> {
    return this.getAllListings().pipe(
      map(listings => listings.find(listing => listing.id === id))
    );
  }
}
