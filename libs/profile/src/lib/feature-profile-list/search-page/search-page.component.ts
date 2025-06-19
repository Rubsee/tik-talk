import { Component, inject } from '@angular/core';
import { ProfileService } from '../../data/services/profile.service';
import { Profile } from '../../../../../interfaces/src/lib/profile/profile.iterface';
import { ProfileCardComponent } from '../../ui/profile-card/profile-card.component';
import { ProfileFiltersComponent } from '../profile-filters/profile-filters.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-search-page',
  imports: [ProfileCardComponent, ProfileFiltersComponent],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
})
export class SearchPageComponent {
  profileService = inject(ProfileService);
  profiles = this.profileService.filteredProfiles;

  constructor() {}
}
