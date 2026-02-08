import {AfterViewInit, Component} from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-maps',
  imports: [],
  templateUrl: './maps.html',
  styleUrl: './maps.css',
})
export class Maps implements  AfterViewInit {
  private map!: L.Map;

  ngAfterViewInit(): void {
    // Centre Paris
    this.map = L.map('map').setView([48.8566, 2.3522], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap'
    }).addTo(this.map);

    // Logement à Paris (exemple)
    const logementLat = 48.8638;
    const logementLng = 2.3376;

    L.marker([logementLat, logementLng])
      .addTo(this.map)
      .bindPopup('🏠 Logement à Paris')
      .openPopup();
  }
}
