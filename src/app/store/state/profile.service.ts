import { Profile, createProfile } from './profile.model';
import { ProfileQuery } from './profile.query';
import { ProfileDataService } from './profile-data.service';
import { Injectable } from '@angular/core';
import { ProfileStore } from './profile.store';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  constructor(
    private profileDataService: ProfileDataService,
    private profileStore: ProfileStore
  ) {}

  add(body: Profile) {
    const user = createProfile(body);
    this.profileStore.add(user);
  }

  getUsers(): Observable<Array<Profile>> {
    const request = this.profileDataService
      .getUsers()
      .pipe(tap((s) => this.profileStore.set(s)));
    return request;
  }
}
