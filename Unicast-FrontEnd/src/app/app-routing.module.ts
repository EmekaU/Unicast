import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginFormComponent } from './components/loginForm/login-form.component';
import { HubComponent } from './components/Hub/hub.component';
import { AuthGuard } from './components/Auth/auth.guard';


const routes: Routes = [
  {path: '', component: LoginFormComponent, pathMatch: 'full' },
  {path: 'login', component: LoginFormComponent},
  {path: 'hub', component: HubComponent, canActivate: [AuthGuard]},
  {path: '**', component: LoginFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }

