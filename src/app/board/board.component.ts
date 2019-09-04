import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ReversiService} from '../reversi.service';

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

}
