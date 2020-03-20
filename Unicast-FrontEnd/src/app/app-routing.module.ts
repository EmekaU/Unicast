import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginFormComponent } from './components/Auth/LoginForm/login-form.component';
import { HubComponent } from './components/Hub/hub.component';
import { AuthGuard } from './components/Auth/auth.guard';


const routes: Routes = [
  {path: '', component: AppComponent, pathMatch: 'full' },
  {path: 'signup', component: LoginFormComponent},
  {path: 'hub', component: HubComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }

