import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ListingsService } from '../../../services/listings/listings-service';

@Component({
  selector: 'app-create-listing-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-listing-modal.html',
  styleUrl: './create-listing-modal.css',
})
export class CreateListingModal {

  @Output() close = new EventEmitter<void>();

  loading = false;
  form: FormGroup;

  imageFiles: File[] = [];
  imagePreviews: string[] = [];

  readonly API_URL = 'http://localhost:5235/api/listings';

  locations = [
    { label: 'Plage', value: 0 },
    { label: 'Montagne', value: 1 },
    { label: 'Campagne', value: 2 },
    { label: 'Ville', value: 3 },
    { label: 'Historique', value: 4 },
    { label: 'Luxe', value: 5 },
    { label: 'Cabane', value: 6 },
  ];

  equipments = [
    { label: 'TV', value: 0 },
    { label: 'Cuisine', value: 1 },
    { label: 'Piscine', value: 2 },
    { label: 'Wifi', value: 3 },
    { label: 'Climatisation', value: 4 },
    { label: 'Chauffage', value: 5 },
    { label: 'Parking', value: 6 },
    { label: 'Lave-linge', value: 7 },
    { label: 'Sèche-linge', value: 8 },
    { label: 'Cheminée', value: 9 },
    { label: 'Jardin', value: 10 },
    { label: 'Balcon', value: 11 },
    { label: 'Terrasse', value: 12 },
    { label: 'Ascenseur', value: 13 },
    { label: 'Salle de sport', value: 14 },
    { label: 'Spa', value: 15 },
    { label: 'Animaux acceptés', value: 16 },
    { label: 'Réfrigérateur', value: 17 },
    { label: 'Vaisselle', value: 18 },
    { label: 'Four', value: 19 },
    { label: 'Congélateur', value: 20 },
    { label: 'Table & chaises', value: 21 },
    { label: 'Shampooing', value: 22 },
  ];

  constructor(
    private fb: FormBuilder,
    private listingsService: ListingsService
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      city: ['', Validators.required],
      address: ['', Validators.required],
      postalCode: [null],
      country: ['', Validators.required],

      pricePerNight: [0, Validators.required],
      price: [0, Validators.required],
      maxGuests: [1, Validators.required],
      surface: [0, Validators.required],
      available: [true],

      location: [<number[]>[]],
      amenities: [<number[]>[]],

      images: [[]],
    });
  }

  toggleLocation(value: number): void {
    const current = this.form.value.location as number[];

    this.form.patchValue({
      location: current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value],
    });
  }

  toggleAmenity(value: number): void {
    const current = this.form.value.amenities as number[];

    this.form.patchValue({
      amenities: current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value],
    });
  }

  onImagesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;

    const files = Array.from(input.files);

    files.forEach(file => {
      this.imageFiles.push(file);

      const reader = new FileReader();
      reader.onload = e => {
        this.imagePreviews.push(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    });
    console.log(this.imageFiles)
    input.value = '';
  }

  removeImage(index: number): void {
    this.imageFiles.splice(index, 1);
    this.imagePreviews.splice(index, 1);
  }

  submit(): void {
    if (this.form.invalid) return;

    this.loading = true;

    try {
      const images = this.imagePreviews.map((imgBase64, index) => ({
        IsCover: index === 0,
        Order: index,
        // Supprime le préfixe data:image/png;base64, si ton backend ne l'accepte pas
        ImageData: imgBase64.replace(/^data:image\/\w+;base64,/, '')
      }));

      const payload = {
        ...this.form.value,
        pricePerNight: this.form.value.price,
        images
      };

      this.listingsService.createListing(payload).subscribe({
        next: () => {
          this.loading = false;
          this.close.emit();
        },
        error: err => {
          console.error('CREATE LISTING ERROR', err);
          this.loading = false;
        },
      });

    } catch (err) {
      console.error('Error preparing images', err);
      this.loading = false;
    }
  }




}
