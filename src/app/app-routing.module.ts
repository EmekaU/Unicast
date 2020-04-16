import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HubComponent } from './components/Hub/hub.component';
import { AuthGuard } from './auth/auth.guard';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { PodcastContainerComponent } from './components/podcast-container/podcast-container.component';
import { PodcastCreationComponent } from './components/podcast-creation/podcast-creation.component';
import { SubscriptionListComponent } from './components/subscription/subscription-list/subscription-list.component';
import { PodcastViewComponent } from './components/podcast-view/podcast-view.component';

const routes: Routes = [
  {path: '', redirectTo: 'signup', pathMatch: 'full' },
  {path: 'signup', component: SignupComponent},
  {path: 'signin', component: SigninComponent},
  {path: 'hub', component: HubComponent, canActivate: [AuthGuard],
    children: [
      {path: 'podcasts', component:PodcastContainerComponent},
      {path: 'podcasts/:type', component:PodcastContainerComponent}
    ]
  },
  {path: 'user-profile/:username', component: UserProfileComponent,
     children: [
      {path: 'create', component: PodcastCreationComponent},
       {path: 'podcasts', component: PodcastViewComponent},
       {path: 'subscriptions', component: SubscriptionListComponent}
      ]
  },
  {path: '**', redirectTo: ''}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

