import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MakePassword} from '../../../@core/utils';

@Component({
    selector: 'app-user-item-dialog',
    templateUrl: './user-item-dialog.component.html',
    styleUrls: ['./user-item-dialog.component.scss'],
})
export class UserItemDialogComponent implements OnInit {

    hidePassword: boolean = true;
    options: any = {
        length: 10,
        digits: false,
        special: false,
    };

    constructor(
        public dialogRef: MatDialogRef<UserItemDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    ngOnInit(): void {
    }

    generatePassword() {
        console.debug('length: ', this.options);
        this.data.item.value = MakePassword.generateWithOptions(this.options);
    }

}
