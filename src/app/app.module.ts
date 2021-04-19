import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { PlayComponent } from './pages/play/play.component';
import { IconButtonComponent } from './components/icon-button/icon-button.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { AuthService } from './services/auth.service';

import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { FooterComponent } from './components/footer/footer.component';
import { ChessPlateComponent } from './components/chess-plate/chess-plate.component';
import { ChessPieceComponent } from './components/chess-piece/chess-piece.component';
import { SocketIoService } from './services/socket-io.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PseudoFormComponent } from './components/pseudo-form/pseudo-form.component';
import { ChessGameService } from './services/chess-game.service';

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
  providers: [AuthService, SocketIoService, ChessGameService],
  bootstrap: [AppComponent],
})
export class AppModule {}
