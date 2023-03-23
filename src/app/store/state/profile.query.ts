import { Observable } from 'rxjs';
import { Profile } from './profile.model';

import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { ProfileStore, ProfileState } from './profile.store';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ProfileQuery extends QueryEntity<ProfileState> {

   getAllUsers$ =this.selectAll().pipe(
     map(this.getAllUsers.bind(this))
   )

  constructor(protected override store: ProfileStore) {
    super(store);
  }

  getAllUsers(): Observable<Profile[]> {
    return this.select(state => state.profiles);
  }

  getLoaded(): Observable<boolean> {
    return this.select(state => state.isLoaded);
  }

  getIsLoading(): Observable<boolean> {
    return this.selectLoading();
  }


}
