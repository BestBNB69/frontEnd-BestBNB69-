import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DatePipe, DecimalPipe} from "@angular/common";

@Component({
  selector: 'app-booking-card',
    imports: [
        DatePipe,
        DecimalPipe
    ],
  templateUrl: './booking-card.html',
  styleUrl: './booking-card.css',
})
export class BookingCard {
  @Input() price: number = 0;
  @Input() rating: number = 0;
  @Input() totalReviews: number = 0;
  @Input() numberOfNights: number = 2;

  @Output() book = new EventEmitter<void>();

  showCalendar = false;
  checkInDate: Date | null = null;
  checkOutDate: Date | null = null;

  cleaningFee = 50;
  serviceFeeRate = 0.14;

  get subtotal(): number {
    return this.price * this.numberOfNights + this.cleaningFee;
  }

  get serviceFee(): number {
    return Math.round(this.subtotal * this.serviceFeeRate);
  }

  get total(): number {
    return this.subtotal + this.serviceFee;
  }

  onBook(): void {
    this.book.emit();
  }
}
