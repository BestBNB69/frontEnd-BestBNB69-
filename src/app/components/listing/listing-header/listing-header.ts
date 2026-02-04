import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-listing-header',
  imports: [],
  templateUrl: './listing-header.html',
  styleUrl: './listing-header.css',
})
export class ListingHeader {
  @Input() city: string = "";
  @Input() country: string = "";
  @Input() title: string = "";
  @Input() rating: number = 0;
  @Input() totalReviews: number = 0;

  @Output() share  = new EventEmitter<void>();
  @Output() save = new EventEmitter<void>();

  onShare(): void{
    this.share.emit();
  }

  onSave(): void{
    this.save.emit();
  }
}
