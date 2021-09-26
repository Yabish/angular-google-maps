import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Angular Google Maps';
  lat = 37.421969;
  lng = -122.084102;
  zoom = 10;
  minZoom = 5;
  maxZoom = 20;
  draggable = true;
}
