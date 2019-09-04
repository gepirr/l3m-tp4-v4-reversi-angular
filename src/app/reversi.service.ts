import { Injectable } from '@angular/core';
import {Board, C, ReversiModelInterface, TileCoords, Turn} from './ReversiDefinitions';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReversiService implements ReversiModelInterface {
  private board: Board;
  private subject = new BehaviorSubject<ReversiModelInterface>(this);
  readonly obs = this.subject.asObservable();
  currentTurn: Turn;

  constructor() {
    this.initBoard();
  }

  getObservable() {
    return this.obs;
  }

  getBoard() {
    return this.board;
  }

  PionsTakenIfPlayAt(x, y): TileCoords[] {
    if (this.board[x][y] === C.Empty) {
      const otherTile = this.turn() === C.Player1 ? C.Player2 : C.Player1 ;
      const tilesToFlip: TileCoords[] = [];
      // Parcourir les 8 directions à partir de la case x, y
      const D = [ [1, 0], [1, 1], [1, -1], [0, 1], [0, -1], [-1, 1], [-1, 0], [-1, -1] ];
      D.forEach( ([dx, dy]) => {
        // S'arréter dès qu'on est au bord du plateau ou que la case n'est pas otherTile
        let px = x;
        let py = y;
        const L: TileCoords[] = [];
        do {
          px += dx; py += dy;
          if (this.board[px] && this.board[px][py] !== undefined) { // Est ce que je suis toujours sur le plateau ?
            L.push({x: px, y: py});
          } else {
            break;
          }
        } while (this.board[px][py] === otherTile);

        if (this.board[px] && this.board[px][py] === this.turn()) {
          L.pop(); // J'enlève le dernier pion, celui qui a déclanché l'arrêt de parcours
          tilesToFlip.push( ...L );
        }
      });

      return tilesToFlip;
    }
    return [];
  }
  turn() {
    return this.currentTurn;
  }
  play(i, j) {
    const L = this.PionsTakenIfPlayAt(i, j);
    if (L.length) {
      this.board[i][j] = this.turn();
      L.forEach(({ x, y }) => this.board[x][y] = this.turn());
      this.currentTurn = this.turn() === C.Player1 ? C.Player2 : C.Player1;
      if (this.skipTurn()) {
        console.log('Skip turn');
        this.currentTurn = this.turn() === C.Player1 ? C.Player2 : C.Player1;
      }
      this.subject.next(this);
    }
  }

  private skipTurn(): boolean {
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (this.PionsTakenIfPlayAt(i, j).length > 0) {
          return false;
        }
      }
    }
    return true;
  }

  private initBoard() {
    this.currentTurn = C.Player1;
    this.board = new Array(8).fill(0).map(l => new Array(8).fill(C.Empty)) as Board;
    this.board[3][3] = this.board[4][4] = C.Player1;
    this.board[4][3] = this.board[3][4] = C.Player2;
  }

}
