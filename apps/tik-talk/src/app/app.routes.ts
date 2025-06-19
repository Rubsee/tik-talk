import { Routes } from '@angular/router';
import { LoginPageComponent } from '@tt/auth';
import { SearchPageComponent } from '@tt/profile';
import { ProfilePageComponent } from '@tt/profile';
import { SettingsPageComponent } from '@tt/profile';
import { chatsRoutes } from '../../../../libs/chats/src/lib/data/feature-chats-workspace/chats-page/chatsRoutes';
import { FormsExperimentComponent } from '@tt/experimental';
import { MyFormsComponent } from '@tt/experimental';
import {canActivateAuth} from "@tt/auth";
import {LayoutComponent} from "@tt/layout";

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'profile/me', pathMatch: 'full' },
      { path: 'search', component: SearchPageComponent },
      { path: 'profile/:id', component: ProfilePageComponent },
      { path: 'settings', component: SettingsPageComponent },
      {
        path: 'chats',
        loadChildren: () => chatsRoutes,
      },
    ],
    canActivate: [canActivateAuth],
  },
  { path: 'login', component: LoginPageComponent },
  { path: 'experimental', component: FormsExperimentComponent },
  { path: 'education', component: MyFormsComponent },
];
