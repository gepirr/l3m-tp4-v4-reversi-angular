import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';
import {IaService} from '../ia.service';
import {Turn} from '../ReversiDefinitions';

@Component({
  selector: 'app-ia',
  templateUrl: './ia.component.html',
  styleUrls: ['./ia.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [IaService] // Chaque instance de composant aura sa propre instance de service
})
export class IaComponent implements OnInit {
  @Input() player: Turn;

  constructor(private ia: IaService) { }

  ngOnInit() {
    // A placer ici car c'est le moment où le composant est bien initialisé
    // Donc l'attribut player a été renseigné par Angular (pas avant, pas dans le constructeur par exemple)
    this.ia.player = this.player;
  }

  get active(): boolean {
    return this.ia.active;
  }

  set active(a: boolean) {
    this.ia.active = a;
  }
}
