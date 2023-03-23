import { Injectable } from '@angular/core';
import { timer, Observable } from 'rxjs';
import { mapTo, map, tap } from 'rxjs/operators';
import { Profile } from './profile.model';
import { guid } from '@datorama/akita';

const profiles: Array<Profile> = [
  {
    id: guid(),
    firstName: 'Petar',
    lastName: 'Petrovic',
    active: false,
  },
  {
    id: guid(),
    firstName: 'Milan',
    lastName: 'Nikolic',
    active: false,
  },
  {
    id: guid(),
    firstName: 'Ivana',
    lastName: 'Vukovic',
    active: false,
  },
  {
    id: guid(),
    firstName: 'Jelena',
    lastName: 'Savic',
    active: false,
  },
];

@Injectable({
  providedIn: 'root',
})
export class ProfileDataService {
  constructor() {}

  getUsers(): Observable<Array<Profile>> {
    return timer(200).pipe(mapTo(profiles));
  }
}
