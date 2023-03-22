import { Profile } from './model/profile';
import { ModalComponent } from './modal/modal/modal.component';
import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  profile: Profile = new Profile;
  constructor(private dialog: MatDialog) {}
  
  
  openDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      id: 1,
      title: 'Angular For Beginners'
  };

    this.dialog.open(ModalComponent, dialogConfig);

    const dialogRef = this.dialog.open(ModalComponent);
 

    dialogRef.afterClosed().subscribe(result => {
       console.log(`Dialog result: ${result}`);
       this.profile = result;
       console.log(this.profile);
     });
  }


}
