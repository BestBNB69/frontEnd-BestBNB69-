import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-listing-modal',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './create-listing-modal.html',
  styleUrl: './create-listing-modal.css',
})
export class CreateListingModal {
  @Output() close = new EventEmitter<void>();

  private API_URL = 'http://localhost:8080/api/listings';

  form!: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      city: ['', Validators.required],
      address: ['', Validators.required],
      country: ['', Validators.required],
      price: [0, Validators.required],
      maxGuests: [1],
      surface: [0],
      available: [true],
    });
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;

    const payload = {
      title: this.form.value.title,
      description: this.form.value.description,
      city: this.form.value.city,
      address: this.form.value.address,
      postalCode: null,
      country: this.form.value.country,

      pricePerNight: this.form.value.price,
      maxGuests: this.form.value.maxGuests,
      price: this.form.value.price,
      surface: this.form.value.surface,
      available: this.form.value.available,

      location: [],
      amenities: [],
      images: []
    };

    this.http.post(this.API_URL, payload).subscribe({
      next: () => {
        this.loading = false;
        this.close.emit();
        this.router.navigate(['/host/dashboard']);
      },
      error: (err) => {
        this.loading = false;
        console.error(err);
      }
    });
  }

}
