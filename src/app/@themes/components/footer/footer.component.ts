import {Component, OnDestroy, OnInit} from '@angular/core';
import {ElectronService} from '../../../@core/services/electron.service';
import {TranslateService} from '@ngx-translate/core';
import {Local} from '../../../@core/local/locals';
import {interval, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit, OnDestroy {
    electron: any;
    updater: any;
    fs: any;
    currentVersion: any;
    releaseVersion: any;
    updateNewVersion: boolean = false;
    releaseUrl = `https://github.com/digital-technology-agency/password-generator/releases/latest`;
    releaseApiUrl = `https://api.github.com/repos/digital-technology-agency/password-generator/releases/latest`;
    footerText = 'version: ';
    private destroy$: Subject<void> = new Subject<void>();

    constructor(private electronService: ElectronService,
                private translate: TranslateService) {
        translate.setTranslation('en', Local.en());
        translate.setTranslation('ru', Local.ru());
        translate.setDefaultLang('en');
    }

    ngOnInit(): void {
        if (this.electronService.isElectron) {
            this.electron = this.electronService.electron;
            this.fs = this.electronService.fs;
            this.updater = this.electronService.electronUpdater;
            this.currentVersion = this.electronService.appVersion;
            this.footerText = `version: ${this.electronService.appVersion}`;
            this.initUpdater();
        } else {
            console.log('Browser');
        }
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }


    feedBack() {
        this.electron.shell.openExternal(`https://github.com/digital-technology-agency/password-generator/issues/new?assignees=&labels=&template=feature_request.md&title=`)
    }

    wikiOnline() {
        this.electron.shell.openExternal(`https://github.com/digital-technology-agency/password-generator/wiki`)
    }

    openActualVersion() {
        this.electron.shell.openExternal(this.releaseUrl);
    }

    languageChange(value: any) {
        this.translate.use(value);
    }

    initUpdater() {
        const updateTimer = interval(30 * 1000);
        updateTimer.pipe(takeUntil(this.destroy$)).subscribe(res => {
            this.checkForUpdate();
        });
    }

    checkForUpdate() {
        this.electronService.get(this.releaseApiUrl).subscribe((resp: any) => {
            this.releaseVersion = resp.tag_name;
            if (this.currentVersion === this.releaseVersion) {
                return;
            }
            this.updateNewVersion = true;
            console.debug('current version:', this.currentVersion, 'release version:', this.releaseVersion);
        });
    }

}
