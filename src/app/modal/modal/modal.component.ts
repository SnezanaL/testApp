import { Profile } from './../../store/state/profile.model';

import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  profileForm;
  title;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.title = data.title;

    console.log(data);

    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });
  }

  ngOnInit() {
    // this.form = this.fb.group({
    //   description: [this.description, []],
    // });
  }
  save() {
    if (this.profileForm.invalid) {
      return;
    }
    this.dialogRef.close(this.profileForm.value);
    console.warn(this.profileForm.value);
  }

  close() {
    this.dialogRef.close();
  }

}
