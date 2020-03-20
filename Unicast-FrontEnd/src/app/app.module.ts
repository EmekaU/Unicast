import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginFormComponent } from './components/loginForm/login-form.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserAPIService } from "./services/unicast-api.service";
import { HubComponent } from './components/Hub/hub.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from "./services/interceptor.service";
import { AuthService } from './services/auth.service';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { AuthGuard } from './components/Auth/auth.guard';
@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    HubComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [UserAPIService, AuthService, AuthGuard, {provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
