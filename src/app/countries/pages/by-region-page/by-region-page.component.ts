import { Component } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'countries-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
  ]
})
export class ByRegionPageComponent {
  termino: string = '';
  countries: Country[] = [];

  constructor(private http: CountriesService) {}

  onValue( value: string ): void {
    this.termino = value;
    if (this.termino.trim().length > 0) {
      this.http.searchByRegion(this.termino)
      .subscribe( countries => {
        this.countries = countries;
      });
    }
    // console.log('El termino recibido es: ', this.termino);
  }
}
