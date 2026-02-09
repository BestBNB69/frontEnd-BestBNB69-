import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ListingsDTO } from '../../models/listingsDTO';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ListingsService {
  private apiUrl = 'http://localhost:5235/api/listings';
  constructor(private http: HttpClient) { }

  private token = localStorage.getItem('token');
  private headers = new HttpHeaders({
    Authorization: `Bearer ${this.token}`
  });

  getAllListings(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  getDashListings(): Observable<any> {
    return this.http.get(`${this.apiUrl}/dash`);
  }

  getListing(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createListing(data: any): Observable<any> {
    const newRes: ListingsDTO = {
      title: data.title,
      description: data.description,
      city: data.city,
      country: data.country,
      address: data.address,
      postalCode: data.postal,
      pricePerNight: data.price,
      maxGuests: data.max,
      surface: data.size,
      available: true,
      location: [0],
      amenities: [0]
    };
    return this.http.post<ListingsDTO>(`${this.apiUrl}`, newRes, {
      headers: this.headers
    })
      .pipe(tap(res => {
        // this.storeAuth(res);
        // this.redirectAfterLogin();
      })
      );
  }

  updateListing(data: any, id: string): Observable<any> {
    const newRes: ListingsDTO = {
      title: data.title,
      description: data.description,
      city: data.city,
      country: data.country,
      address: data.address,
      postalCode: data.postal,
      pricePerNight: data.price,
      maxGuests: data.max,
      surface: data.size,
      available: true,
      location: [0],
      amenities: [0]
    };
    return this.http.put<ListingsDTO>(`${this.apiUrl}/${id}`, newRes, {
      headers: this.headers
    })
      .pipe(tap(res => {
        // this.storeAuth(res);
        // this.redirectAfterLogin();
      })
      );
  }

  deleteListing(id: string): Observable<any> {
    return this.http.delete<ListingsDTO>(`${this.apiUrl}/${id}`, {
      headers: this.headers
    });
  }

  // getAllListings(): Observable<DetailsAnnoucement[]> {
  //   return  of(DETAILS_ANNONCEMENT);
  // }

  // getListing(id: number): Observable<DetailsAnnoucement | undefined> {
  //   return this.getAllListings().pipe(
  //     map(listings => listings.find(listing => listing.id === id))
  //   );
  // }
}
