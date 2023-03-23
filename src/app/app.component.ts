import { map } from 'rxjs/operators';
import { ProfileStore } from './store/state/profile.store';
import { ProfileQuery } from './store/state/profile.query';
import { ProfileService } from './store/state/profile.service';
import { Profile } from './store/state/profile.model';
import { Observable } from 'rxjs';
import { filter, switchMap, take } from 'rxjs/operators';
import { ModalComponent } from './modal/modal/modal.component';
import { Component } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { guid } from '@datorama/akita';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  dialogAddUser?: MatDialogRef<ModalComponent>;
  addUserButton: boolean | undefined;
  profile!: Profile;
  profiles: Profile[] = [];
  profiles$!: Observable<Profile[]>;
  filteredItems: any;
  loading = false;

  constructor(
    private profileStore: ProfileStore,
    private profileService: ProfileService,
    public profileQuery: ProfileQuery,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.addUserButton = false;
    this.profileQuery.getIsLoading().subscribe((res) => (this.loading = res));
    this.profileQuery.getAllUsers().subscribe((res) => {
      this.profiles = res;
    });
    this.profileQuery.getAllUsers$.subscribe((res) => {
      this.profiles$ = res;
    });
    this.profileQuery
      .getLoaded()
      .pipe(
        take(1),
        filter((res) => !res),
        switchMap(() => {
          this.profileStore.setLoading(true);
          return this.profileService.getUsers();
        })
      )
      .subscribe(
        (res) => {
          this.profileStore.update(() => {
            return {
              profiles$: res,
              profiles: res,
              isLoaded: true,
            };
          });
          this.profileStore.setLoading(false);
        },
        (err) => {
          console.log(err);
          this.profileStore.setLoading(false);
        }
      );
  }

  isDisableButton() {
    let activeUsers: any;
    this.filteredItems = this.profiles$
      .pipe(map((data) => data.filter((user) => user.active)))
      .subscribe((res) => {
        activeUsers = res;
        return activeUsers;
      });

    if (
      activeUsers.length === this.profiles.length &&
      this.profiles.length < 5
    ) {
      return true;
    } else {
      false;
    }
  }

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      title: 'Add new user',
    };

    this.dialogAddUser = this.dialog.open(ModalComponent, dialogConfig);

    this.dialogAddUser.afterClosed().subscribe((result: any) => {
      if (result === undefined) return;
      this.profile = result;
      const body: Profile = {
        id: guid(),
        firstName: this.profile.firstName,
        lastName: this.profile.lastName,
        active: false,
      };
      this.profileStore.update((state: { profiles: any }) => {
        return {
          profiles: [...state.profiles, body],
        };
      });

      this.addUserButton = this.isDisableButton() || undefined;
    });
  }

  close(): void {
    this.dialog.closeAll();
  }

  onChange($event: MatSlideToggleChange, id: any) {
    const userId = id;
    const checked = $event.checked;
    this.profileStore.update((state: { profiles: any }) => {
      const profiles = [...state.profiles];
      const index = profiles.findIndex((t) => t.id === userId);
      profiles[index] = {
        ...profiles[index],
        active: checked,
      };
      return {
        ...state,
        profiles,
      };
    });

    this.addUserButton = this.isDisableButton() || undefined;
  }
}
