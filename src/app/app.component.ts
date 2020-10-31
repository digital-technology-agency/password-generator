import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {UserItemDialogComponent} from './user-item-dialog/user-item-dialog.component';
import {MakePassword} from './@core/utils';
import {ElectronService} from './@core/electron.service';
import {TranslateService} from '@ngx-translate/core';
import {Local} from './@core/local/locals';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
    electron: any;
    fs: any;
    footerText = 'version: ';

    constructor(private electronService: ElectronService,
                private translate: TranslateService) {
        translate.setTranslation('en', Local.en());
        translate.setTranslation('ru', Local.ru());
        translate.setDefaultLang('en');
    }

    ngOnInit() {
        if (this.electronService.isElectron) {
            console.log('Run in electron');
            this.electron = this.electronService.electron;
            this.fs = this.electronService.fs;
            this.footerText = `version: ${this.electronService.appVersion}`;
            const url = this.electronService.electronUpdater.getFeedURL();
            console.log('Url: ', url, 'autoUpdater: ', this.electronService.electronUpdater);
            this.electronService.electronUpdater.checkForUpdates();
        } else {
            console.log('Browser');
        }
    }

    ngOnDestroy() {
    }

    openActualVersion() {
        this.electron.shell.openExternal(`https://github.com/digital-technology-agency/password-generator/releases/latest`)
    }

    languageChange(value: any) {
        this.translate.use(value);
    }
}
