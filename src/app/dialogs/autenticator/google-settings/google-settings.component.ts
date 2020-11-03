import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ElectronService} from '../../../@core/services/electron.service';
import QRCode from 'qrcode'

@Component({
    selector: 'app-google-settings',
    templateUrl: './google-settings.component.html',
    styleUrls: ['./google-settings.component.scss'],
})
export class GoogleSettingsComponent implements OnInit {

    speakeasy: any;
    verifedNumber: any;
    secretData: any;
    qrCodeImage: any;

    constructor(public dialogRef: MatDialogRef<GoogleSettingsComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                private electronService: ElectronService) {
    }

    ngOnInit(): void {
        this.speakeasy = this.electronService.speake;
        this.secretData = this.speakeasy.generateSecret({length: 20, name: 'DTA Password Manager'});
        this.data.item.secret32 = this.secretData.base32;
        QRCode.toDataURL(this.secretData.otpauth_url).then(url => {
            this.qrCodeImage = url;
            console.log(url);
        });
    }

    get verifed() {
        return this.speakeasy.totp.verify({
            secret: this.data.item.secret32,
            encoding: 'base32',
            token: `${this.verifedNumber}`,
        });
    }
}
