import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'countries-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: [
  ]
})
export class ByCapitalPageComponent {
  termino: string = '';
  countries: Country[] = [];

  constructor(private http: CountriesService) {}

  onValue( value: string ): void {
    this.termino = value;
    if (this.termino.trim().length > 0) {
      this.http.searchByCapital(this.termino)
      .subscribe( countries => {
        this.countries = countries;
      });
    }
    // console.log('El termino recibido es: ', this.termino);
  }
}
