import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'countries-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: [
  ]
})
export class ByCountryPageComponent {
  termino: string = '';
  countries: Country[] = [];

  constructor(private http: CountriesService) {}

  onValue( value: string ): void {
    this.termino = value;
    if (this.termino.trim().length > 0) {
      this.http.searchByNombre(this.termino)
      .subscribe( countries => {
        this.countries = countries;
      });
    }
    // console.log('El termino recibido es: ', this.termino);
  }
}
