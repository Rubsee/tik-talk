import {Routes} from '@angular/router';
import {LoginPageComponent} from '@tt/auth';
import {ProfileEffects, profileFeature, SearchPageComponent} from '@tt/profile';
import {ProfilePageComponent} from '@tt/profile';
import {SettingsPageComponent} from '@tt/profile';
import {chatsRoutes} from '../../../../libs/chats/src/lib/data/feature-chats-workspace/chats-page/chatsRoutes';
import {FormsExperimentComponent} from '@tt/experimental';
import {MyFormsComponent} from '@tt/experimental';
import {canActivateAuth} from "@tt/auth";
import {LayoutComponent} from "@tt/layout";
import {provideState} from "@ngrx/store";
import {provideEffects} from "@ngrx/effects";
import {PostEffects, postFeature} from "@tt/posts";

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {path: '', redirectTo: 'profile/me', pathMatch: 'full'},
      {
        path: 'search',
        component: SearchPageComponent,
        providers: [
          provideState(profileFeature),
          provideEffects(ProfileEffects)
        ]
      },
      {
        path: 'profile/:id',
        component: ProfilePageComponent,
        providers: [
          provideState(postFeature),
          provideEffects(PostEffects)
        ]
      },
      {path: 'settings', component: SettingsPageComponent},
      {
        path: 'chats',
        loadChildren: () => chatsRoutes,
      },
    ],
    canActivate: [canActivateAuth],
  },
  {path: 'login', component: LoginPageComponent},
  {path: 'experimental', component: FormsExperimentComponent},
  {path: 'education', component: MyFormsComponent},
];
