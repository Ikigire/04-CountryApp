import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';
import { Region } from '../../interfaces/region.type';


@Component({
  selector: 'countries-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
  ]
})
export class ByRegionPageComponent implements OnInit {
  countries: Country[] = [];
  regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']
  selectedRegion?: Region;
  isLoading: boolean = false;

  constructor(private http: CountriesService) { }

  ngOnInit(): void {
    this.countries = this.http.cacheStore.byRegion.countries;
    this.selectedRegion = this.http.cacheStore.byRegion.region;
  }

  onValue(value: Region): void {
    this.selectedRegion = value;
    this.isLoading = true;
    this.http.searchByRegion(value)
      .subscribe(countries => {
        this.countries = countries;
        this.isLoading = false;
      });
    // console.log('El termino recibido es: ', this.termino);
  }
}
