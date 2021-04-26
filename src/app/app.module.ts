import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PseudoFormComponent } from './components/forms/pseudo-form/pseudo-form.component';

import { AppComponent } from './app.component';
// pages
import { HomeComponent } from './components/pages/home/home.component';
import { PlayComponent } from './components/pages/play/play.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { LoginComponent } from './components/pages/login/login.component';

// game
import { ChessPlateComponent } from './components/game/chess-plate/chess-plate.component';
import { ChessPieceComponent } from './components/game/chess-piece/chess-piece.component';
import { OpponentListComponent } from './components/game/opponent-list/opponent-list.component';
import { OpponentItemComponent } from './components/game/opponent-item/opponent-item.component';

// forms
import { RegisterFormComponent } from './components/forms/register-form/register-form.component';
import { LoginFormComponent } from './components/forms/login-form/login-form.component';

// tools
import { FooterComponent } from './components/tools/footer/footer.component';
import { IconButtonComponent } from './components/tools/icon-button/icon-button.component';

// services
import { AuthService } from './services/auth.service';
import { SocketIoService } from './services/socket-io.service';
import { ChessGameService } from './services/chess-game.service';
import { UserService } from './services/user.service';
import { DuelListComponent } from './components/game/duel-list/duel-list.component';
import { DuelItemComponent } from './components/game/duel-item/duel-item.component';
import { BannerComponent } from './components/game/banner/banner.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PlayComponent,
    IconButtonComponent,

    LoginComponent,

    LoginFormComponent,

    RegisterComponent,
    RegisterFormComponent,
    FooterComponent,
    ChessPlateComponent,
    ChessPieceComponent,
    PseudoFormComponent,
    OpponentListComponent,
    OpponentItemComponent,
    DuelListComponent,
    DuelItemComponent,
    BannerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
  ],
  providers: [AuthService, SocketIoService, ChessGameService, UserService],
  bootstrap: [AppComponent],
})
export class AppModule {}
