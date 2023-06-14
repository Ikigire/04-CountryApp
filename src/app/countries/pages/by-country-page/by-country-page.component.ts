import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'countries-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: [
  ]
})
export class ByCountryPageComponent implements OnInit {
  countries: Country[] = [];
  isLoading: boolean = false;
  initTerm: string = '';

  constructor(private http: CountriesService) { }

  ngOnInit(): void {
    this.countries = this.http.cacheStore.byCountry.countries;
    this.initTerm = this.http.cacheStore.byCountry.term;
  }

  onValue(value: string): void {
    this.isLoading = true;
      this.http.searchByNombre(value)
        .subscribe(countries => {
          this.countries = countries;
          this.isLoading = false;
        });
    // console.log('El termino recibido es: ', this.termino);
  }
}
