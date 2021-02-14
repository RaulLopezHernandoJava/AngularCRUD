import { MessageService } from './../message.service';
import { HeroService } from './../hero.service';
import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  selectedHero: Hero;


  // Definimos el array de "heroes" vacio que posteriormente con el metodo get lo rellenaremos con los datos que nos pase
  // el servicio

  heroes: Hero[];

  // Antes de aplicar el Observable

  // getHeroes(): void {
  //   this.heroes = this.heroService.getHeroes();
  // }
  getHeroes():void{
    this.heroService.getHeroes()
    .subscribe(heroes =>this.heroes = heroes)
  }


  onSelect(hero : Hero) : void{
    this.selectedHero = hero;
    this.messageService.add('Heroes Component: Selected Hero Id=${hero.id}');
  }

   // Ahora ya no cogemos directamente el array de heroes "heroes = HEROES" sino que lo cogemos a traves de un servicio "hero.service".
   // Para eso el servicio se inyecta a traves del constructor

  constructor(private heroService: HeroService, private messageService:MessageService) { }

  ngOnInit(): void {
    // El ultimo paso es inicializar el metodo "getHeroes()" en el metodo ngOnInit. Esto se hace asi porque el constructor
    // no puede inicializar (no realiza ninguna accion mas que ser el medio a traves del cual nos podemos traer datos del service)
    this.getHeroes()
  }

  add(name:string):void{
    name = name.trim(); // El metodo "trim()" quita espacios tanto delante como detras
    if(!name){return ;}
    this.heroService.addHero({name} as Hero)
      .subscribe(hero => {this.heroes.push(hero);})
  }


  delete(hero: Hero):void{
    this.heroes = this.heroes.filter(h => h !== hero);
    // El "subscribe" es necesario aunque no llamemos ninguna funcion dentro de el
    // Si no ponemos el "subscribe" el servidor no envio la peticion de borrado al servidor
    this.heroService.deleteHero(hero).subscribe();
  }
}
