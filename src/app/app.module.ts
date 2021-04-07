import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { from } from 'rxjs';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { IconButtonComponent } from './components/icon-button/icon-button.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { AuthService } from './services/auth.service';

import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { FooterComponent } from './components/footer/footer.component';
import { ChessPlateComponent } from './components/chess-plate/chess-plate.component';
import { ChessPawnComponent } from './components/chess-pawn/chess-pawn.component';
import { ChessPlateCaseComponent } from './components/chess-plate-case/chess-plate-case.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    IconButtonComponent,

    LoginComponent,
    LoginFormComponent,

    RegisterComponent,
    RegisterFormComponent,
    FooterComponent,
    ChessPlateComponent,
    ChessPawnComponent,
    ChessPlateCaseComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    AuthService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
