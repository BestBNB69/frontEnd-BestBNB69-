import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { CreateListingPayload, DetailsAnnoucement } from '../../models/details-annoucement';
import { DETAILS_ANNONCEMENT } from '../../mocks/details-anoncement';
import { ListingsDTO } from '../../models/listingsDTO';
import { FormControl, ɵFormGroupRawValue, ɵTypedOrUntyped } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ListingsService {
  private apiUrl = 'http://localhost:5235/api/listings';

  constructor(private http: HttpClient) { }

  // Génère dynamiquement les headers pour chaque requête
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  // 🔹 Liste complète (mock ou API)
  getAllListings(): Observable<DetailsAnnoucement[]> {
    // Pour mock
    // return of(DETAILS_ANNONCEMENT);

    // Pour API réelle
    return this.http.get<DetailsAnnoucement[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  // 🔹 Dashboards
  getDashListings(): Observable<ListingsDTO[]> {
    return this.http.get<ListingsDTO[]>(`${this.apiUrl}/dash`, { headers: this.getHeaders() });
  }

  // 🔹 Détail d'une annonce
  getListing(id: string): Observable<any | undefined> {
    // Depuis mock
    // return this.getAllListings().pipe(
    //   map(listings => listings.find(listing => listing.id === id))
    // );

    // Depuis API
    return this.http.get<any>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  // 🔹 Création
  createListing(payload: ɵTypedOrUntyped<{
    title: FormControl<string>;
    description: FormControl<string>;
    city: FormControl<string>;
    country: FormControl<string>;
    address: FormControl<string>;
    postal: FormControl<string>;
    price: FormControl<number>;
    max: FormControl<number>;
    size: FormControl<number>
  }, ɵFormGroupRawValue<{
    title: FormControl<string>;
    description: FormControl<string>;
    city: FormControl<string>;
    country: FormControl<string>;
    address: FormControl<string>;
    postal: FormControl<string>;
    price: FormControl<number>;
    max: FormControl<number>;
    size: FormControl<number>
  }>, any>): Observable<void> {
    return this.http.post<void>(this.apiUrl, payload, { headers: this.getHeaders() });
  }

  updateListing(data: any, id: string): Observable<ListingsDTO> {
    const updated: ListingsDTO = {
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
      location: [],
      amenities: [],
    };

    return this.http.put<ListingsDTO>(`${this.apiUrl}/${id}`, updated, {
      headers: this.getHeaders(),
    }).pipe(
      tap(res => {
        // Actions après update si nécessaire
      })
    );
  }

  // 🔹 Suppression
  deleteListing(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}
