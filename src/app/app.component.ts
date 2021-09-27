import { MapsAPILoader } from '@agm/core';
import {
  Component,
  ElementRef,
  NgZone,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Angular Google Maps';

  blnRejectLocation: boolean = true;
  private geoCoder: any;
  @ViewChild('search', { static: true })
  public searchElementRef: any;

  // lat and lng
  latitude = 37.421969;
  longitude = -122.084102;

  // maps
  zoom = 10;
  minZoom = 5;
  maxZoom = 20;
  zoomControl = true;
  streetViewControl = true;
  mapTypeControl = true;

  // marker
  draggable = true;

  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) {}

  ngOnInit(): void {
    this.loadGoogleMap();
  }

  markerDraggingEnd(event: any) {
    console.log(event);
    this.latitude = event.coords.lat;
    this.longitude = event.coords.lng;
  }

  loadGoogleMap() {
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder();
      let autocomplete = new google.maps.places.Autocomplete(
        this.searchElementRef.nativeElement
      );
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          this.blnRejectLocation = false;
          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 16;
        });
      });
    });
  }

  setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // console.log("position-->", position);
          this.blnRejectLocation = false;
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          this.zoom = 16;
          this.getAddress(this.latitude, this.longitude);
        },
        (err) => {
          //! While user reject to share location --- This ERROR Triggers
          //? Choose manual location selection
          this.blnRejectLocation = true;

          // if (this.blnLocateMe) {
          //   this.toastrService.error(
          //     "Please enable location permission from settings and try again"
          //   );
          // }

          // console.log("error-->", err);
        }
      );
    }
  }

  getAddress(latitude: number, longitude: number) {
    // console.log(latitude + " - " + longitude);
    this.geoCoder.geocode(
      { location: { lat: +latitude, lng: +longitude } },
      (results: any, status: any) => {
        // console.log("results--> ", results);
        // console.log("status--> ", status);
        if (status === 'OK') {
          if (results[0]) {
            this.blnRejectLocation = false;
            // console.log(this.blnRejectLocation);
            this.zoom = 16;
            // this.address = results[0].formatted_address;
            // this.locationForm.patchValue({
            //   strPlace: results[0].formatted_address,
            // });
          } else {
            // this.toastrService.error("No results found.");
          }
        } else {
          // this.toastrService.error("Geocoder failed due to:" + status);
        }
      }
    );
  }
}
