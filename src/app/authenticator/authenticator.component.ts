import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ElectronService} from '../@core/electron.service';
import {GoogleSettingsComponent} from '../dialogs/autenticator/google-settings/google-settings.component';

@Component({
    selector: 'app-authenticator',
    templateUrl: './authenticator.component.html',
    styleUrls: ['./authenticator.component.scss'],
})
export class AuthenticatorComponent implements OnInit {

    fs: any;
    setting2FaFile = '2fa.setting';
    speakeasy: any;
    verifedNumber: any;

    constructor(public dialog: MatDialog,
                private electronService: ElectronService) {
    }

    ngOnInit(): void {
        this.speakeasy = this.electronService.speake;
        this.fs = this.electronService.fs;
    }

    initSettings() {
        const dialogRef = this.dialog.open(GoogleSettingsComponent, {
            height: 'auto',
            width: '300px',
            data: {
                item: this.settingHistory,
                title: '2FA Google Settings',
            },
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                console.debug(result);
                this.fs.writeFileSync(this.setting2FaFile, JSON.stringify(result), (err) => {
                    if (err) {
                        console.debug("An error ocurred creating the file " + err.message);
                    }
                    console.debug("The file has been succesfully saved");
                });
            }
        });
    }

    get settingHistory() {
        if (!this.exist2fa) {
            return {secret32: null};
        }
        const readFileSync = this.fs.readFileSync(this.setting2FaFile, 'utf8', function (err, data) {
            if (err) return undefined;
            return data;
        });
        return JSON.parse(readFileSync === null ? {secret32: null} : readFileSync);
    }

    get exist2fa() {
        return this.fs.existsSync(this.setting2FaFile)
    }

    get verifed() {
        const readFileSync = this.fs.readFileSync(this.setting2FaFile, 'utf8', function (err, data) {
            if (err) return undefined;
            return data;
        });
        return this.speakeasy.totp.verify({
            secret: JSON.parse(readFileSync).secret32,
            encoding: 'base32',
            token: `${this.verifedNumber}`,
        });
    }
}
