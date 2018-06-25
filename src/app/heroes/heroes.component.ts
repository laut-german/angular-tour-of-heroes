import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes : Hero[];
  selectedHero: Hero;

 constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes(); //Primero se llama aquí
  }
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    //console.log("selectedHero: " + hero.name);
  }
/*   getHeroes(): void {
    this.heroes = this.heroService.getHeroes(); 
  } */
  getHeroes(): void {
    this.heroService.getHeroes()
        .subscribe(heroes => this.heroes = heroes);//Segundo se llama aquí, rellenando el array que luego se pintara en pantalla
  }
}
