import {Component, inject, signal} from '@angular/core';
import {
  ProfileHeaderComponent
} from '../../ui/profile-header/profile-header.component';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {toObservable} from '@angular/core/rxjs-interop';
import {switchMap} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {SvgIconComponent} from '@tt/common-ui';
import {ImgUrlPipe} from '@tt/common-ui';
import {PostFeedComponent} from "@tt/posts";
import {ProfileService} from '../../data/services/profile.service';


@Component({
  selector: 'app-profile-page',
  imports: [
    ProfileHeaderComponent,
    AsyncPipe,
    RouterLink,
    SvgIconComponent,
    ImgUrlPipe,
    PostFeedComponent,
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent {
  profileService = inject(ProfileService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  isMyPage = signal(false);

  subscribers$ = this.profileService.getSubscribersShortList(5);

  me$ = toObservable(this.profileService.me);

  profile$ = this.route.params.pipe(
    switchMap(({id}) => {
      this.isMyPage.set(id === 'me' || id === this.profileService.me()?.id);
      if (id === 'me') return this.me$;

      return this.profileService.getAccount(id);
    })
  );

  async sendMessage(userId: number) {
    this.router.navigate(['/chats', 'new'], {queryParams: {userId}});
  }
}
