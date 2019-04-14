import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { element } from '@angular/core/src/render3';
import { Router, ActivatedRoute } from '@angular/router';
import { SearchService } from 'src/app/services/search/search.service';
import { LocateService } from 'src/app/services/locate/locate.service';
import { AddressDataService } from 'src/app/services/addressData/address-data.service';
import { SearchResult } from 'src/app/model/searchresult';
import { Address } from 'src/app/model/address';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit{

  symptom: any;
  currentLat: any;
  currentLong: any;
  searchResult: SearchResult[];
  currentAddress: string;
  partOfDay: string;
  public address : any;

  ngOnInit() {
    //set color tab button search 
    var list = document.querySelectorAll('.paoday');
    list[0].classList.add("clicked");
    //get MORNING default
    this.getPartOfDate();
    //
    if(this.currentAddress == null)
    {
      this.locateLocation();
      console.log("huhu")
    }
    else
    console.log("OK");
  }


  constructor(private router: Router, private searchService: SearchService, private addressData: AddressDataService,
    private locateService: LocateService, private activatedRoute: ActivatedRoute) {
      this.activatedRoute.queryParamMap.subscribe(queryParams => {
        this.currentAddress = queryParams.get("address");
      });
  }

  getAddress(currentLat: number, currentLong: number) {
    this.locateService.getAddress(currentLat, currentLong)
      .subscribe(result => {
        this.currentAddress = result.resultAddress;
        this.addressData.currentAddress.next(result.resultAddress);
        console.log(this.currentAddress);
      });
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

  searchDoctors() {
    this.searchService.getListDoctor(this.symptom, this.currentLat, this.currentLong, this.partOfDay)
      .subscribe(result => {
        this.searchResult = result;
      });
  }

  btnSearch_click() {
    this.searchDoctors();
  }

  chang1(event) {
    var list = document.querySelectorAll('.paoday');
    list.forEach(element => {
      element.classList.remove("clicked");
    })
    event.srcElement.classList.add("clicked");
    this.getPartOfDate();
  }

  getPartOfDate()
  {
    var selected = document.querySelectorAll('.clicked');
    let textInside = selected[0].textContent;
    let morning = 'Sáng';
    let afternoon = 'Trưa';
    if (textInside.trim() === morning)
      this.partOfDay = "MORNING";
    else if (textInside.trim() === afternoon)
      this.partOfDay = "AFTERNOON";
    else
      this.partOfDay = "EVENING";
    console.log(textInside);
    console.log(this.partOfDay);
  }

  btnDoctor_click() {
    this.router.navigateByUrl('/account');
  }

  btnMap_click()
  {
    this.router.navigate(['/map'],{ queryParams: { address: this.currentAddress } });
  }

}
