import { BrowserModule } from '@angular/platform-browser';
import { NgModule , CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserAPIService } from "./services/unicast-api.service";
import { HubComponent } from './components/Hub/hub.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from "./services/interceptor.service";
import { AuthService } from './services/auth.service';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { AuthGuard } from './auth/auth.guard';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SubscriptionListComponent } from './components/subscription/subscription-list/subscription-list.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { SanitizePipe } from './Pipes/sanitize.pipe';
import { CommonModule } from '@angular/common';
import { ImageUtil } from './utilities/image-util';
@NgModule({
  declarations: [
    AppComponent,
    HubComponent,
    HeaderComponent,
    SignupComponent,
    SigninComponent,
    SidebarComponent,
    SubscriptionListComponent,
    SearchBarComponent,
    SanitizePipe
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [UserAPIService, AuthService, AuthGuard, SanitizePipe, ImageUtil, {provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true}],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
