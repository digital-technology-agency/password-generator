import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
    selector: 'app-new-rsa-cert',
    templateUrl: './new-rsa-cert.component.html',
    styleUrls: ['./new-rsa-cert.component.scss'],
})
export class NewRsaCertComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<NewRsaCertComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    ngOnInit(): void {
        console.debug(this.data);
    }


    get certPublicInfo() {
        return this.data.item.certData.publicKey.export({
            type: "pkcs1",
            format: "pem",
        })
    }

    get certPrivateInfo() {
        return this.data.item.certData.privateKey.export({
            type: "pkcs1",
            format: "pem",
        })
    }

}
