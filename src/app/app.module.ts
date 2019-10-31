import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { PionComponent } from './pion/pion.component';
import {ReversiService} from './reversi.service';
import { CommentateurComponent } from './commentateur/commentateur.component';
import { IaComponent } from './ia/ia.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    PionComponent,
    CommentateurComponent,
    IaComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [ReversiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
