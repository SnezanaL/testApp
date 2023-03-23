import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Profile } from './profile.model';

export interface ProfileState extends EntityState<Profile> {
  profiles: Profile[];
  isLoaded: boolean,
}

export const getInitialState = () => {
  return {
    profiles: [],
    isLoaded: false,
  };
};



@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'profiles' })
export class ProfileStore extends EntityStore<ProfileState> {

  constructor() {
    super(getInitialState());
  }

}
