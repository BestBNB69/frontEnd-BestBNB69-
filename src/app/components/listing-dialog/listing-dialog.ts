import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-listing-dialog',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './listing-dialog.html',
  styleUrl: './listing-dialog.css',
})
export class ListingDialog {
  showModal = false;
  isEdit = false;

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
    city: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50),
        Validators.pattern('^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$'),
      ],
    }),
    price: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.required],
    }),
  })

  form = {
    id: null as number | null,
    title: '',
    city: '',
    pricePerNight: 0,
    active: true
  };

  listings: any[] = [];

  /** OUVERTURE CREATE */
  openCreate(): void {
    this.isEdit = false;
    this.resetForm();
    this.showModal = true;
  }

  /** OUVERTURE EDIT */
  openEdit(listing: any): void {
    this.isEdit = true;
    this.form = { ...listing };
    this.showModal = true;
  }

  /** SAVE */
  save(): void {
    if (this.isEdit) {
      console.log('UPDATE listing', this.form);
    } else {
      console.log('CREATE listing', this.form);
    }
    new this.close();
  }

  private resetForm(): void {
    this.form = {
      id: null,
      title: '',
      city: '',
      pricePerNight: 0,
      active: true
    };
  }
  @Output() close = new EventEmitter<void>();
}
