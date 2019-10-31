import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {C, Turn} from '../ReversiDefinitions';

@Component({
  selector: 'app-pion',
  templateUrl: './pion.component.html',
  styleUrls: ['./pion.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PionComponent implements OnInit {
  @Input() player: Turn; // On définit un attribut TS lié (data-binding) à un attribut de la balise

  constructor() {}

  ngOnInit() {
  }

  get isPlayer1(): boolean { // Attribut calculé en lecture seule
    return this.player === C.Player1;
  }

  get isPlayer2(): boolean { // Attribut calculé en lecture seule
    return this.player === C.Player2;
  }

}
