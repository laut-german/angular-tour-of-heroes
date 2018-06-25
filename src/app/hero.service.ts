import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Hero } from './hero';
import { catchError, map, tap } from 'rxjs/operators';
import { HEROES } from './mock-heroes';
@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = 'api/heroes';  // URL to web api
  constructor( 
            private http: HttpClient,
            private messageService: MessageService) { }
  /* getHeroes(): Hero[] {
    return HEROES;
  }
} */
getHeroes(): Observable<Hero[]> {
  return this.http.get<Hero[]>(this.heroesUrl)//.pipe(this.handleError('getHeroes', []));
}
private log(message: string) {
  this.messageService.add('HeroService: ' + message);
}
getHero(id: number): Observable<Hero> {
//  this.messageService.add(`HeroService: fetched hero id=${id}`);
//  return of(HEROES.find(hero => hero.id === id));
const url = `${this.heroesUrl}/${id}`;
console.log("url:"+url)
  return this.http.get<Hero>(url)//.pipe(catchError(this.handleError<Hero>(`getHero id=${id}`)));
}

private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
 
    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead
 
    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);
 
    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}
}
