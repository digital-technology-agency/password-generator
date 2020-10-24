import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-user-item-dialog',
  templateUrl: './user-item-dialog.component.html',
  styleUrls: ['./user-item-dialog.component.scss']
})
export class UserItemDialogComponent implements OnInit {

  constructor(
      public dialogRef: MatDialogRef<UserItemDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
  }

}
