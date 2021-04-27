import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/pages/home/home.component';
import { LoginComponent } from './components/pages/login/login.component';
import { PlayComponent } from './components/pages/play/play.component';
import { TrainComponent } from './components/pages/train/train.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { AuthGuardService } from './helpers/services/auth-guard.service';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'play', canActivate: [AuthGuardService], component: PlayComponent },
  { path: 'train', canActivate: [AuthGuardService], component: TrainComponent },
  { path: '**', redirectTo: 'books' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
