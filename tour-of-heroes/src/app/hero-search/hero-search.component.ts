import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

// Vamos a necesitar el "Hero" y su servicio
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {

  heroes$ : Observable<Hero[]>
  private searchTerms = new Subject<string>();

  constructor(
    private heroService:HeroService
  ) { }

  search(term:string):void{
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      // Establece un tiempo en el que se van pidiendo las busquedas para evitar colapso o bloqueo del programo
      debounceTime(300),

      // Se asegura de realizar una nueva busqueda si el termino de busqueda nuevo es distinto al anterior
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.heroService.searchHeroes(term)),
    );
  }

}
