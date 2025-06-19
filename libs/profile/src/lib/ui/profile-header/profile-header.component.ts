import { Component, input } from '@angular/core';
import { Profile } from '../../../../../interfaces/src/lib/profile/profile.iterface';
import { ImgUrlPipe } from '../../../../../common-ui/src/lib/pipes/img-url.pipe';
import { AvatarCircleComponent } from '../../../../../common-ui/src/lib/components/avatar-circle/avatar-circle.component';

@Component({
  selector: 'app-profile-header',
  imports: [ImgUrlPipe, AvatarCircleComponent],
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.scss',
})
export class ProfileHeaderComponent {
  profile = input<Profile>();
}
