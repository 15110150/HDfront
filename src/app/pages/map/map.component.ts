import { Component, OnInit, ViewChild, Directive, ElementRef, NgZone, Input } from '@angular/core';
import { } from 'googlemaps';
import { LocateService } from 'src/app/services/locate/locate.service';
import { AddressDataService } from 'src/app/services/addressData/address-data.service';
import { google } from "google-maps";
import { MapsAPILoader } from '@agm/core';
import { FormControl } from "@angular/forms";
import { Router, ActivatedRoute } from '@angular/router';

declare var google: google;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {

  @ViewChild('gmap') gmapElement: any;

  public map: google.maps.Map;
  public zoom: number;
  public searchControl: FormControl;
  currentLat: any;
  currentLong: any;
  address: any;
  marker: google.maps.Marker;
  currentAddress: string;
  

  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(private locateService: LocateService, private elRef: ElementRef, private addressData: AddressDataService,
    private mapsAPILoader: MapsAPILoader, private ngZone: NgZone, private activatedRoute: ActivatedRoute, 
    private router : Router) {
      this.activatedRoute.queryParamMap.subscribe(queryParams => {
        this.currentAddress = queryParams.get("address");
      });
    }

  getAddress(currentLat: number, currentLong: number) {
    this.locateService.getAddress(currentLat, currentLong)
      .subscribe(result => {
        this.currentAddress = result.resultAddress;
      });
      let location = new google.maps.LatLng(currentLat, currentLong);
      if (!this.marker) {
        this.marker = new google.maps.Marker({
          position: location,
          map: this.map,
        });
      }
      else {
        this.marker.setPosition(location);
      }
  }

  locateLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.currentLat = position.coords.latitude;
        this.currentLong = position.coords.longitude;
        this.getAddress(this.currentLat, this.currentLong);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  btnBack_click()
  {
    this.ngZone.run(() => {
      this.router.navigate(['/search'],{ queryParams: { address: this.currentAddress } });
    });
  }

  ngOnInit() {
    if(this.currentAddress == null)
    {
      this.locateLocation();
    }
    else
    console.log("OK");
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"],
        componentRestrictions: {country: "vn"}
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          this.addressData.currentAddress.next(document.querySelectorAll(".ipggplace")[0].textContent);
          this.addressData.address = document.querySelectorAll(".ipggplace")[0].textContent;
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.currentLat = place.geometry.location.lat();
          this.currentLong = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
  }
}
