import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-pion',
  templateUrl: './pion.component.html',
  styleUrls: ['./pion.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PionComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
