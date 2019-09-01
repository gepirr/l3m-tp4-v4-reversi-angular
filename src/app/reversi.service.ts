import { Injectable } from '@angular/core';
import {Board, C, ReversiModelInterface, Turn} from './ReversiDefinitions';
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

  canPlay(x, y) {
    if (this.board[x][y] === C.Empty) {
      const otherTile = this.turn() === C.Player1 ? C.Player2 : C.Player1;
      const tilesToFlip = [];
      [[0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0], [-1, 1]].forEach(([dx, dy]) => {
        let posX = x;
        let posY = y;
        const L = [];
        do {
          posX += dx;
          posY += dy;
          L.push({ x: posX, y: posY });
        } while (posX >= 0 && posY >= 0 && posX < 8 && posY < 8 && this.board[posX][posY] === otherTile);
        if (posX >= 0 && posY >= 0 && posX < 8 && posY < 8
          && this.board[posX][posY] === this.turn()
          && (Math.abs(posX - x) >= 2 || Math.abs(posY - y) >= 2)) {
          tilesToFlip.push(...L);
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
    const L = this.canPlay(i, j);
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
        if (this.canPlay(i, j).length > 0) {
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
