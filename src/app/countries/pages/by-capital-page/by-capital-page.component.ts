import { Component } from '@angular/core';

@Component({
  selector: 'countries-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: [
  ]
})
export class ByCapitalPageComponent {
  termino: string = '';

  onValue( value: string ): void {
    this.termino = value;
    console.log('El termino recibido es: ', this.termino);
  }
}
