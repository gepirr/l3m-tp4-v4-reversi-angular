import { Injectable } from '@angular/core';
import {ReversiService} from './reversi.service';
import {ReversiModelInterface, TileCoords, Turn} from './ReversiDefinitions';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {delay, filter} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IaService {
  private isActive = new BehaviorSubject<boolean>( false );
  private delay = 100; // 100ms
  player: Turn;

  constructor(private RS: ReversiService) {
    combineLatest( // On combine 2 observale: voir http://reactivex.io/documentation/operators/combinelatest.html
      RS.getObservable(),
      this.isActive
    ).pipe( // On filtre et on décale dans le temps la publications des informations
      filter( ([rs, active]) => active && rs.turn() === this.player ),
      delay( this.delay )
    ).subscribe( // On s'abonne à l'observable ainsi créé
      () => this.play()
    );
  }

  get active(): boolean {
    return this.isActive.getValue();
  }

  set active(a: boolean) {
    this.isActive.next(a);
  }

  private play() {
    const L: TileCoords[] = [];
    this.RS.getBoard().forEach( (line, x) => line.forEach( (c, y) => {
      if (this.RS.PionsTakenIfPlayAt(x, y).length > 0) {
        L.push( {x, y} );
      }
    }) );
    const {x: i, y: j} = L[ Math.floor(Math.random() * L.length) ];
    this.RS.play(i, j);
  }

}
