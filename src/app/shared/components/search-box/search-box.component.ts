import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent implements OnInit, OnDestroy{
  // Inputs
  @Input()
  placeholder: string = '';
  @Input()
  initValue: string = '';
  
  // Outputs
  @Output()
  onValue: EventEmitter<string>;
  @Output('onDebounce')
  debounceEmmiter: EventEmitter<string>;

  // Atributos
  private debouncer: Subject<string> = new Subject<string>()
  private debouncerSub?: Subscription;

  ngOnInit(): void {
      this.debouncerSub = this.debouncer
      .pipe(
        debounceTime(500)
      )
      .subscribe(
        value => {
          if (value.trim() != '') {
            this.debounceEmmiter.emit( value );
          }
        }
      );
  }

  constructor() {
    this.onValue = new EventEmitter<string>();
    this.debounceEmmiter = new EventEmitter<string>();
  }
  ngOnDestroy(): void {
    this.debouncerSub?.unsubscribe();
  }

  emitText( texto: string ): void {
    this.onValue.emit(texto);
  }

  onKeyPress( searchTerm: string ): void {
    this.debouncer.next( searchTerm );
    
  }
}
