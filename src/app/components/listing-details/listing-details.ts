import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListingsService } from '../../services/listings/listings-service';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';


@Component({
  selector: 'app-listing-details',
  imports: [CommonModule, Header, Footer],
  templateUrl: './listing-details.html',
  styleUrl: './listing-details.css',
})
export class ListingDetails implements OnInit {
  listing: any = null;
  id!: string;
  loading = true;
  error = false;

  constructor(
    private route: ActivatedRoute,
    private listingsService: ListingsService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.loadListing();
  }

  loadListing() {
    this.listingsService.getListing(this.id).subscribe(res => {
      this.listing = res;
      this.loading = false;
      this.cdr.detectChanges();
    });
  }
}
