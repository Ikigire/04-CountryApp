import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from "rxjs/operators";

import { Country } from '../interfaces/country';

@Injectable({providedIn: 'root'})
export class CountriesService {

    private url: string = 'https://restcountries.com/v3.1/';

    constructor(private http: HttpClient) { }
    
    searchByCapital(termino: string): Observable<Country[]> {
        let endpointUrl: string = `${ this.url }capital/${ termino }`;
        return this.http.get<Country[]>(endpointUrl) 
        .pipe(
            catchError( error => of([]) )
        );
    }
    searchByRegion(region: string): Observable<Country[]> {
        let endpointUrl: string = `${ this.url }region/${ region }`;
        return this.http.get<Country[]>(endpointUrl)
        .pipe(
            catchError( error => of([]) )
        );
    }
    searchByNombre(termino: string): Observable<Country[]> {
        let endpointUrl: string = `${ this.url }name/${ termino }`;
        return this.http.get<Country[]>(endpointUrl)
        .pipe(
            catchError( error => of([]) )
        );
    }
    searchByCode(code: string): Observable<Country> {
        let endpointUrl: string = `${ this.url }alpha/${ code }`;
        return this.http.get<Country>(endpointUrl)
        .pipe(
            catchError( error => of() )
        );
    }
}