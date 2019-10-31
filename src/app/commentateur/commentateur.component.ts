import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ReversiService} from '../reversi.service';
import {C, ReversiModelInterface, Turn} from '../ReversiDefinitions';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-commentateur',
  templateUrl: './commentateur.component.html',
  styleUrls: ['./commentateur.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentateurComponent implements OnInit {
  players: Turn[] = [C.Player1, C.Player2];

  constructor(private rs: ReversiService) { }

  ngOnInit() {
  }

  get observableReversi(): Observable<ReversiModelInterface> {
    return this.rs.getObservable();
  }

  get turn(): Turn {
    return this.rs.turn();
  }

  getScore(player: Turn): number {
    return this.rs.getBoard()
                  .reduce( (acc, L) => acc + L.reduce( (nb, c) => c === player ? nb + 1 : nb
                                                     , 0)
                         , 0 );

  }
}
