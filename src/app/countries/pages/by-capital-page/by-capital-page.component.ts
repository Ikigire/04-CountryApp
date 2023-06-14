import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'countries-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: [
  ]
})
export class ByCapitalPageComponent implements OnInit {
  countries: Country[] = [];
  isLoading: boolean = false;
  initTerm: string = '';

  constructor(private http: CountriesService) {}

  ngOnInit(): void {
    this.countries = this.http.cacheStore.byCapital.countries;
    this.initTerm = this.http.cacheStore.byCapital.term;
  }

  onValue( value: string ): void {
    this.isLoading = true;
      this.http.searchByCapital(value)
      .subscribe( countries => {
        this.countries = countries;
        this.isLoading = false;
      });
    // console.log('El termino recibido es: ', this.termino);
  }
}
