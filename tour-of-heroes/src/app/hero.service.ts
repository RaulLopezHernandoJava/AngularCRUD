//Importamos interface de "Hero" y el array de "HEROES"

import { HEROES } from './mock-heroes';
import { Hero } from './hero';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
// Import para poder realizar peticiones HTTP
import { HttpClient, HttpHeaders } from '@angular/common/http';
// Import para gestionar los errores que podrian surgir de interactuar con un server
import { catchError, map, tap } from 'rxjs/operators';




@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl = 'api/heroes';  // URL to web api

  // Las "httpOptions" las utilizamos para especificar la cabecera especificando que se utilizara 'json'
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  // Cojemos todos los Heroes. Hemos echo un import del array de todos los heroes y ahora lo cojemos con el metodo "getHeroes()"
  // getHeroes(): Hero[]{
  //   return HEROES;
  // }

  // Ahora vamos a reemplazar el metodo anterior por un observable
  constructor(
    private messageService: MessageService,
    private http: HttpClient,
  ) { }

  // Metodos

  // Recogiendo datos de "mock-heroes.ts" METODO 1
  // getHeroes() : Observable<Hero[]>{
  //   const heroes = of(HEROES);
  //   this.messageService.add('HeroService: fetched heroes');
  //   return heroes;
  // }

  // Simulando peticion HTTP (¿REST?)

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }

    /** GET hero by id. Return `undefined` when id not found */
    getHeroNo404<Data>(id: number): Observable<Hero> {
      const url = `${this.heroesUrl}/?id=${id}`;
      return this.http.get<Hero[]>(url)
        .pipe(
          map(heroes => heroes[0]), // returns a {0|1} element array
          tap(h => {
            const outcome = h ? `fetched` : `did not find`;
            this.log(`${outcome} hero id=${id}`);
          }),
          catchError(this.handleError<Hero>(`getHero id=${id}`))
        );
    }



  // getHero(id:number): Observable<Hero>{
  //   this.messageService.add('HeroService : fetched hero id=${id}');
  //   return of(HEROES.find(hero =>hero.id === id));
  // }

  //Aplicando el anterior metedo a Http "getHero" e incluyendo el error por si falla

  // GET HERO

  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`Fetched hero id = ${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  //UPDATE HERO

  updateHero(hero: Hero): Observable<any> {
    // El metodo put : url, lo que queremos actualizar(hero),opciones
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`Update hero id=${hero.id}`))
    );
  }


  // ADD HERO
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`Added Hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    )
  }

  // DELETE HERO

  deleteHero(hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`Deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  //SEARCH HERO

  searchHeroes(term:string):Observable<Hero[]>{
    // Si no existe el parametro para la busqueda devolvera el array vacio
    if(!term.trim()){
      return of([]);
    }

    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap( x => x.length ?
        this.log(`Found heroes matching "${term}"`) :
        this.log(`No heroes matching "${term}"`)),
        catchError(this.handleError<Hero[]>('searchHeroes',[]))
    )
  }

  private log(message: string) {
    this.messageService.add(`HeroService : ${message}`);
  }
}
