import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ListingsService } from '../../services/listings/listings-service';

@Component({
  selector: 'app-listing-dialog',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './listing-dialog.html',
  styleUrl: './listing-dialog.css',
})
export class ListingDialog {
  @Input() showModal = false;
  @Input() isEdit = false;
  @Input() listing: any | null = null;
  constructor(private listingsService: ListingsService, private router: Router) { }

  listingForm = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50),
        Validators.pattern('^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$'),
      ],
    }),
    description: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.pattern('^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$'),
      ],
    }),
    city: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50),
        Validators.pattern('^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$'),
      ],
    }),
    country: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50),
        Validators.pattern('^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$'),
      ],
    }),
    address: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50),
        Validators.pattern('^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$'),
      ],
    }),
    postal: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.minLength(1),
        Validators.maxLength(50),
        Validators.pattern('^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$'),
      ],
    }),
    price: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    max: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    size: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.required],
    }),
  })

  ngOnChanges(): void {
    if (this.isEdit && this.listing) {
      this.listingForm.patchValue({
        title: this.listing.title,
        description: this.listing.description,
        city: this.listing.city,
        country: this.listing.country,
        address: this.listing.address,
        postal: this.listing.postal,
        price: this.listing.price,
        max: this.listing.max,
        size: this.listing.size,
      });
    }
    if (!this.isEdit) {
      this.listingForm.reset({
        title: "",
        description: "",
        city: "",
        country: "",
        address: "",
        postal: "",
        price: 0,
        max: 0,
        size: 0,
      });
    }
  }

  save(): void {
    if (this.isEdit) {
      this.listingsService.updateListing(this.listingForm.getRawValue(), this.listing.id).subscribe({
        next: () => {
          this.close.emit();
          window.location.reload();
        },
        error: (res: any) => {
          console.error(res)
        },
      });
    } else {
      this.listingsService.createListing(this.listingForm.getRawValue()).subscribe({
        next: () => {
          this.close.emit();
          window.location.reload();
        },
        error: (res: any) => {
          console.error(res)
        },
      });
    }
  }
  @Output() close = new EventEmitter<void>();
}
