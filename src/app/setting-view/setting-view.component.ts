import {Component, OnInit} from '@angular/core';
import {SettingsService} from '../@core/services/settings.service';
import {SettingType} from '../@core/SettingType';
import {GoogleSettingsComponent} from '../dialogs/autenticator/google-settings/google-settings.component';
import {MatDialog} from '@angular/material/dialog';
import {Auth2faService} from '../@core/services/auth-2fa-service';

@Component({
    selector: 'app-setting-view',
    templateUrl: './setting-view.component.html',
    styleUrls: ['./setting-view.component.scss'],
})
export class SettingViewComponent implements OnInit {

    settings: any;

    constructor(private settingsService: SettingsService,
                public dialog: MatDialog,
                private auth2Fa: Auth2faService) {
        this.settings = this.settingsService.settings;
    }

    ngOnInit(): void {
    }

    saveData() {
        this.settingsService.saveData(this.settings);
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
            if (result) {
                this.settings.secret32 = result.secret32;
            }
        });
    }

}
