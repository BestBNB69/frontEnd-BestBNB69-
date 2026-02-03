import {DetailsAnnoucement} from '../../models/details-annoucement';
import {ListingsService} from '../../services/listings/listings-service';
import {ActivatedRoute} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Header} from '../header/header';
import {Footer} from '../footer/footer';
import {DayCalendar} from '../../models/calendar';
import {ListingHeader} from '../listing-header/listing-header';

@Component({
  selector: 'app-listing-details',
  imports: [CommonModule, Header, Footer, ListingHeader],
  templateUrl: './listing-details.html',
  styleUrl: './listing-details.css',
})
export class ListingDetails implements OnInit {
  listing: DetailsAnnoucement | undefined;
  id!: number;
  loading = true;
  error = false;
  showCalendar = false;
  checkInDate: Date | null = null;
  checkOutDate: Date | null = null;
  currentMonth: Date = new Date();
  nextMonth: Date = new Date();
  numberOfNights = 0;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly listingsService: ListingsService
  ) {}

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadListing();
    this.currentMonth = new Date();
    this.nextMonth = new Date(this.currentMonth);
    this.nextMonth.setMonth(this.nextMonth.getMonth() + 1);
  }

  loadListing() {
    this.listingsService.getListing(this.id).subscribe(res => {
      this.listing = res;
      this.loading = false;
    });
  }


  getDaysInMonth(date: Date): DayCalendar[] {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: DayCalendar[] = [];

    // Ajouter les jours vides au début
    const offset = startingDayOfWeek === 0 ? 6 : startingDayOfWeek - 1;
    for (let i = 0; i < offset; i++) {
      days.push({
        date: new Date(),
        day: 0,
        available: false,
        selected: false,
        inRange: false,
        empty: true
      });
    }

    // Ajouter tous les jours du mois
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(year, month, day);
      const dateString = currentDate.toISOString().split('T')[0];

      // Vérifier si la date est disponible dans listing.availability
      const isAvailable = this.listing?.availability?.find(
        (a: any) => a.date === dateString
      )?.available ?? true;

      const isSelected = this.isDateSelected(currentDate);
      const inRange = this.isDateInRange(currentDate);

      days.push({
        date: currentDate,
        day: day,
        available: isAvailable,
        selected: isSelected,
        inRange: inRange,
        empty: false
      });
    }

    return days;
  }

  isDateSelected(date: Date): boolean {
    if (!this.checkInDate && !this.checkOutDate) return false;

    const dateStr = date.toDateString();
    return dateStr === this.checkInDate?.toDateString() ||
      dateStr === this.checkOutDate?.toDateString();
  }

  isDateInRange(date: Date): boolean {
    if (!this.checkInDate || !this.checkOutDate) return false;
    return date > this.checkInDate && date < this.checkOutDate;
  }

  selectDate(day: DayCalendar) {
    if (!day.available || day.empty) return;

    if (!this.checkInDate || (this.checkInDate && this.checkOutDate)) {
      // Premier clic ou reset
      this.checkInDate = day.date;
      this.checkOutDate = null;
    } else if (day.date > this.checkInDate) {
      // Deuxième clic - date de départ
      this.checkOutDate = day.date;
      this.calculateNights();
    } else {
      // Date antérieure - reset
      this.checkInDate = day.date;
      this.checkOutDate = null;
    }
  }

  calculateNights() {
    if (this.checkInDate && this.checkOutDate) {
      const diffTime = this.checkOutDate.getTime() - this.checkInDate.getTime();
      this.numberOfNights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
  }

  clearDates() {
    this.checkInDate = null;
    this.checkOutDate = null;
    this.numberOfNights = 0;
  }

  previousMonth() {
    this.currentMonth = new Date(this.currentMonth);
    this.currentMonth.setMonth(this.currentMonth.getMonth() - 1);
    this.nextMonth = new Date(this.currentMonth);
    this.nextMonth.setMonth(this.nextMonth.getMonth() + 1);
  }

  nextMonthAction() {
    this.currentMonth = new Date(this.currentMonth);
    this.currentMonth.setMonth(this.currentMonth.getMonth() + 1);
    this.nextMonth = new Date(this.currentMonth);
    this.nextMonth.setMonth(this.nextMonth.getMonth() + 1);
  }
}
