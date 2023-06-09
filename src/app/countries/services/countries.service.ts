import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, delay, tap } from "rxjs/operators";

import { Country } from '../interfaces/country';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({providedIn: 'root'})
export class CountriesService {

    private url: string = 'https://restcountries.com/v3.1/';
    cacheStore: CacheStore = {
        byCapital: {
            term: '',
            countries: []
        },
        byCountry: {
            term: '',
            countries: []
        },
        byRegion: {
            countries: []
        }
        
    }

    constructor(private http: HttpClient) { 
        this.loadFromLocalStorage();
    }

    private saveToLocalStorage(): void {
        localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore))
    }
    
    private loadFromLocalStorage(): void {
        if ( !localStorage.getItem('cacheStore') ) return ;

        this.cacheStore = JSON.parse( localStorage.getItem('cacheStore')! )
    }
    

    private getCountriesRequest(url: string): Observable<Country[]>{
        return this.http.get<Country[]>( url )
        .pipe(
            catchError( () => of([]) ),
            delay(500)
        );
    }

    searchByCapital(termino: string): Observable<Country[]> {
        let endpointUrl: string = `${ this.url }capital/${ termino }`;
        return this.getCountriesRequest( endpointUrl )
        .pipe(
            tap( countries => this.cacheStore.byCapital = {term: termino, countries} ),
            tap(() => this.saveToLocalStorage())
        );
    }
    searchByRegion(region: Region): Observable<Country[]> {
        let endpointUrl: string = `${ this.url }region/${ region }`;
        return this.getCountriesRequest(endpointUrl)
        .pipe(
            tap( countries => this.cacheStore.byRegion = {region, countries} ),
            tap(() => this.saveToLocalStorage())
        );
    }
    searchByNombre(termino: string): Observable<Country[]> {
        let endpointUrl: string = `${ this.url }name/${ termino }`;
        return this.getCountriesRequest(endpointUrl)
        .pipe(
            tap( countries => this.cacheStore.byCountry = {term: termino, countries} ),
            tap(() => this.saveToLocalStorage())
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