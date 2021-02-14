import { Component, OnInit,Input } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  @Input() hero : Hero;

  constructor(
    // ActivatedRoute lo para extrarer los parametros del router. En este caso nos interesa el "id" de cada heroe
    private route: ActivatedRoute,
    private heroService: HeroService,
    // Location lo utilizamos para interactuar con el navegador. Lo utilizaremos para volver atras desde esta pagina
    // de detalle del heroe

    private location: Location
  ) {}

  // GET HERO
  getHero():void{
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id).subscribe(hero => this.hero = hero);

  }

  // SAVE

  // Caundo guardamos al heroe volvemos a la pagina inicial o Dashboard
  save():void{
    this.heroService.updateHero(this.hero)
    .subscribe(() => this.goBack());
  }

  goBack():void{
    this.location.back();
  }

  ngOnInit(): void {
    this.getHero();
  }

}
