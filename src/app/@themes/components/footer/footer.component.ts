import {Component, OnInit} from '@angular/core';
import {ElectronService} from '../../../@core/services/electron.service';
import {TranslateService} from '@ngx-translate/core';
import {Local} from '../../../@core/local/locals';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
    electron: any;
    fs: any;
    footerText = 'version: ';

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
            this.footerText = `version: ${this.electronService.appVersion}`;
        } else {
            console.log('Browser');
        }
    }

    feedBack() {
        this.electron.shell.openExternal(`https://github.com/digital-technology-agency/password-generator/issues/new?assignees=&labels=&template=feature_request.md&title=`)
    }

    openActualVersion() {
        this.electron.shell.openExternal(`https://github.com/digital-technology-agency/password-generator/releases/latest`)
    }

    languageChange(value: any) {
        this.translate.use(value);
    }

}
