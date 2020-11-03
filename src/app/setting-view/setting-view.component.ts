import {Component, OnDestroy, OnInit} from '@angular/core';
import {SettingsService} from '../@core/services/settings.service';
import {SettingType} from '../@core/SettingType';
import {GoogleSettingsComponent} from '../dialogs/autenticator/google-settings/google-settings.component';
import {MatDialog} from '@angular/material/dialog';
import {Auth2faService} from '../@core/services/auth-2fa-service';
import {interval, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
    selector: 'app-setting-view',
    templateUrl: './setting-view.component.html',
    styleUrls: ['./setting-view.component.scss'],
})
export class SettingViewComponent implements OnInit, OnDestroy {

    settings: any;
    private destroy$: Subject<void> = new Subject<void>();

    constructor(private settingsService: SettingsService,
                public dialog: MatDialog,
                private auth2Fa: Auth2faService) {
        this.settings = this.settingsService.settings;
    }

    ngOnInit(): void {
        if (this.settings.saveInterval) {
            const saveTimer = interval(this.settings.saveInterval);
            saveTimer.pipe(takeUntil(this.destroy$)).subscribe(res => {
                if (this.settings.autosave) {
                    this.settingsService.saveData(this.settings);
                    console.debug('auto save settings... ', this.settings);
                } else {
                    console.debug('not auto  save settings... ');
                }
            });
        }
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
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

    clear2Fa() {
        this.settings.secret32 = null;
    }

}
