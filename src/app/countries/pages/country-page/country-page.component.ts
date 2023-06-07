import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'countries-country-page',
  templateUrl: './country-page.component.html',
  styles: [
  ]
})
export class CountryPageComponent implements OnInit{
  country?: Country;
  
  constructor( 
    private paisesService:CountriesService,
    private actvatedRoute:ActivatedRoute,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.actvatedRoute.params
    .pipe(
      switchMap( ({ccr3}) => this.paisesService.searchByCode(ccr3) )
    )
    .subscribe(
      (country) => {
        if (!country) {
          this.router.navigateByUrl('');
        }
        setTimeout(()=>{
          this.country = country!;
        }, 2000);
      }
    )
  }
}
