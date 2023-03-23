import { map } from 'rxjs/operators';
import { ProfileStore } from './store/state/profile.store';
import { ProfileQuery } from './store/state/profile.query';
import { ProfileService } from './store/state/profile.service';
import { Profile } from './store/state/profile.model';
import { Observable, Subscription } from 'rxjs';
import { filter, switchMap, take } from 'rxjs/operators';
import { ModalComponent } from './modal/modal/modal.component';
import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig,MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as uuid from 'uuid';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { guid } from '@datorama/akita';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  dialogAddUser!: MatDialogRef<ModalComponent>;

  addUserButton!: boolean;
  profile!: Profile;

  public useDefault = false;

  hh: any;

  createProfileSub!: any;

  loading = false;
  profiles: Profile[] = [];

  profiles$!: Observable<Profile[]>;

  filteredItems: any;

  //profiles$: any;
  constructor(

    private profileStore: ProfileStore,
    private profileService: ProfileService,
    public profileQuery: ProfileQuery,
    private dialog: MatDialog
  ) {
    this.addUserButton = false;
    //this.profiles$ = this.profileQuery.selectAll()
  }

  ngOnInit() {

    this.profileQuery.getIsLoading().subscribe(res => this.loading = res);
    this.profileQuery.getAllUsers().subscribe(res => this.profiles = res);
    this.profileQuery.getLoaded().pipe(
      take(1),
      filter(res => !res),
      switchMap(() => {
        this.profileStore.setLoading(true);
        return this.profileService.getUsers();
      })
    ).subscribe(res => {
      this.profileStore.update(state => {
        return {
          profiles: res,
          isLoaded: true,
        };
      });
      this.profileStore.setLoading(false);
    }, err => {
      console.log(err);
      this.profileStore.setLoading(false);
    });


    // //this.profiles$ = this.profileQuery.selectAll();
    // //this.getUsers();
    // this.profileService.getUsers().subscribe();
    // this.profiles$ = this.profileQuery.selectAll();
    // //this.profiles = this.profileQuery.selectAll();
    // this.profileQuery.getAllUsers().subscribe(res => this.profiles = res);
    // console.log(this.profiles);
    
    
  }

  
// Filters all those objects in Person array which has atleast one visible item
//const result = this.profiles.filter(v => {




  // nullifyFormData() {
  //   this.profile = ;
  // }

  // getUsers() {
  //   this.profileService.getUsers()
  //   .subscribe({
  //     next(response) {
  //       //this.hh = response;
  //       console.log(response);
  //     },
  //     error(err) {
  //       console.error('Error: ' + err);
  //     },
  //     complete() {
        
  //       console.log('Completed');
  //     },
  //   });
  // }

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      title: 'Add new user',
    };

    //this.dialog.open(ModalComponent, dialogConfig);

    this.dialogAddUser = this.dialog.open(ModalComponent, dialogConfig);

    this.dialogAddUser.afterClosed().subscribe((result: any) => {
      if(result === undefined) return;
      console.log(`Dialog result: ${result}`);
      this.profile = result;
      const body: Profile = {
        id: guid(),
        firstName: this.profile.firstName,
        lastName: this.profile.lastName,
        active: false
      };
      this.profileStore.update((state: { profiles: any; }) => {
        return {
          profiles: [
            ...state.profiles,
            body
          ]
        };
      });
    });
  }

  close(): void {
    this.dialog.closeAll();
  }

  onChange($event: MatSlideToggleChange, id: any) {
    const userId = id;
    const checked = $event.checked;
    //this.useDefault = $event.checked
    this.profileStore.update((state: { profiles: any; }) => {
      const profiles = [...state.profiles];
      const index = profiles.findIndex(t => t.id === id);
      profiles[index] = {
        ...profiles[index],
        active: checked
      };
      return {
        ...state,
        profiles
      };
    });

    this.filteredItems = this.profiles.filter(o => o.active);
    if( this.filteredItems.length === this.profiles.length) {
      this.addUserButton = true;
    }
    console.log(this.filteredItems)
    // this.createProfileSub = 
    //  this.profileStore.update(userId, entity => { 
    //   const pr = [...entity.active]
    //   return {
    //     config: {
    //       ...entity,
    //       active: checked 
    //     }
    

    // }});
    //this.profiles$ = this.profileQuery.getAll();
    //this.profileQuery.getAllUsers().subscribe(res => this.profiles = res);
    
    //const profiles = [...profiles];
    //this.profileStore.update(state => {
    //   active: checked
    // }
    //)
    //   const profiles =  [...state.profiles];
      // // const index = profiles.findIndex(t => t.id === id);
      // profiles[0] = {
      //   ...state.profiles[0],
      //   active: checked
      // };

      //console.log(profiles);
    //    return {
    //      ...state.profiles,
    //      profiles

    //   }
    // }
    //);
    
    //this.getUsers();
    // this.profiles$ = this.profileQuery.selectAll();
     console.log(this.profiles);
    // this.profiles = this.profileQuery.getAll();
     console.log(this.profiles);
    
}
}
