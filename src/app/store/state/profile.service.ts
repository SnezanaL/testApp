import { Profile, createProfile } from './profile.model';
import { ProfileQuery } from './profile.query';
import { ProfileDataService } from './profile-data.service';
import { Injectable } from '@angular/core';
import {  ID } from '@datorama/akita';
import { ProfileStore, ProfileState } from './profile.store';
import { map, tap, catchError } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProfileService  {

  constructor(
     private profileDataService: ProfileDataService,
     private profileStore: ProfileStore,
     private profileQuery: ProfileQuery
    ) {
      
  }

  add(body: Profile) {
    const user = createProfile(body);
    this.profileStore.add(user);
  }


  getUsers(): Observable<Array<Profile>>{
    const request = this.profileDataService.getUsers().pipe(
      tap(s => this.profileStore.set(s))
    );
    
    return request;
 

    // return this.profileQuery ? request : noop(); 
    // return this.profileQuery. ... ???;
    //.isPristine ? request :noop() ; // request
  }

  // updateActive(profile: Profile, checked: any) {
  //   this.profileStore.update(profile.id, {
  //     profile.active: checked
  //   });
  // }

  // changeActive(id: string, profile: Profile) {
  //   //console.log(profile.id, profile.active)
  //   this.profileStore.update(profile.id,  {
  //     ...profile
      
  //   })
    
  // }



}
