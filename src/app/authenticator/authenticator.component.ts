import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {GoogleSettingsComponent} from '../dialogs/autenticator/google-settings/google-settings.component';
import {Auth2faService} from '../@core/services/auth-2fa-service';

@Component({
    selector: 'app-authenticator',
    templateUrl: './authenticator.component.html',
    styleUrls: ['./authenticator.component.scss'],
})
export class AuthenticatorComponent implements OnInit {

    verifedNumber: any;

    constructor(public dialog: MatDialog,
                private auth2Fa: Auth2faService) {
    }

    ngOnInit(): void {
    }

    initSettings() {
        const dialogRef = this.dialog.open(GoogleSettingsComponent, {
            height: 'auto',
            width: '300px',
            data: {
                item: this.auth2Fa.secret,
                title: '2FA Settings',
            },
        });
        dialogRef.afterClosed().subscribe(result => {
            this.auth2Fa.saveSettings(result);
        });
    }

    get verifed() {
        return this.auth2Fa.verifed(this.verifedNumber);
    }
}
