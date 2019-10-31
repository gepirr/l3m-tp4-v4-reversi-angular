import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ReversiService} from '../reversi.service';
import {Board, C, ReversiModelInterface, Turn} from '../ReversiDefinitions';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardComponent implements OnInit {

  constructor(private rs: ReversiService) { }

  ngOnInit() {
  }

  get observableReversi(): Observable<ReversiModelInterface> {
    return this.rs.getObservable();
  }

  getBoard(): Board {
    return this.rs.getBoard();
  }

  notEmpty(c: C): boolean {
    return c !== C.Empty;
  }

  getPlayer(c: C): Turn { // Pour avoir le bon typage
    return c as Turn;
  }

  canPlay(i: number, j: number): boolean {
    return this.rs.PionsTakenIfPlayAt(i, j).length > 0;
  }

  play(i: number, j: number): void {
    this.rs.play(i, j);
  }

  trackIndex(index: number, element: any): number {
    return index;
  }
}
