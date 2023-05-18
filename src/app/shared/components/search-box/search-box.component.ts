import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent {
  // Inputs
  @Input()
  placeholder: string = '';
  
  // Outputs
  @Output()
  onValue: EventEmitter<string>;

  // Atributos

  constructor() {
    this.onValue = new EventEmitter<string>();
  }

  emitText( texto: string ): void {
    this.onValue.emit(texto);
  }
}
