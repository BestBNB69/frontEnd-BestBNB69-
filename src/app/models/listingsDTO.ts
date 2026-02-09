export interface ListingsDTO {
  title: string,
  description: string,
  city: string,
  country: string,
  address: string,
  postalCode: string,
  pricePerNight: 0,
  maxGuests: 0,
  surface: 0,
  available: boolean,
  location: number[],
  amenities: number[]
}
