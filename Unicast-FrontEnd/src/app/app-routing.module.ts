import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HubComponent } from './components/Hub/hub.component';
import { AuthGuard } from './auth/auth.guard';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';

const routes: Routes = [
  {path: '', redirectTo: 'signup', pathMatch: 'full' },
  {path: 'signup', component: SignupComponent},
  {path: 'signin', component: SigninComponent},
  {path: 'hub', component: HubComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: ''}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }

