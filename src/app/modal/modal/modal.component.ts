import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  profileForm;
  description;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) data: any
    //TODO: umesto any staviti --> ProfileData
  ) {
    this.description = data;

    console.log(data);

    this.profileForm = this.fb.group({
      firstName: [''],
      lastName: [''],
    });
  }

  ngOnInit() {
    // this.form = this.fb.group({
    //   description: [this.description, []],
    // });
  }
  save() {
    this.dialogRef.close(this.profileForm.value);
    console.warn(this.profileForm.value);
  }

  close() {
    this.dialogRef.close();
  }

}
