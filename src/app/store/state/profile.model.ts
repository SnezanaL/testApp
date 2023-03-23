import { ID, guid } from '@datorama/akita';

export interface Profile {
  id: ID;    
  firstName: string,
  lastName: string,
  active: boolean,
}

export function createProfile( {
  firstName = '',
  lastName = '',
  active = false,
}: Partial<Profile>): Profile {
  return {
    id: guid(),
    firstName,
    lastName,
    active,
  } as Profile;
}
