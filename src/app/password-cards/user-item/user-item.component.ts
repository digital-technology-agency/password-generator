import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {ClipboardService} from 'ngx-clipboard';
import {ToastrService} from 'ngx-toastr';
import {ElectronService} from '../../@core/services/electron.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-user-item',
    templateUrl: './user-item.component.html',
    styleUrls: ['./user-item.component.scss'],
})
export class UserItemComponent implements OnInit {

    @Input() item;
    @Output() deleteClick = new EventEmitter<any>();
    hidePassword: boolean = true;
    electron: any;


    constructor(private _clipboardService: ClipboardService,
                private toastr: ToastrService,
                private electronService: ElectronService,
                private translate: TranslateService) {
    }

    ngOnInit(): void {
        this.electron = this.electronService.electron;
    }

    removeClick(item: any) {
        this.deleteClick.emit(item);
    }

    openDefaultBrowser() {
        this.electron.shell.openExternal(`http://${this.item.site}`)
    }

    copy() {
        this._clipboardService.copy(this.item.value);
        const prefix = this.translate.instant('Password by');
        const postfix = this.translate.instant('copied to clipboard');
        const title = this.translate.instant('Clipboard');
        this.toastr.success(`${prefix} ${this.item.site} - ${postfix}!`, title);
    }

    copyLogin() {
        this._clipboardService.copy(this.item.login);
        const prefix = this.translate.instant('Login by');
        const postfix = this.translate.instant('copied to clipboard');
        const title = this.translate.instant('Clipboard');
        this.toastr.success(`${prefix} ${this.item.login} - ${postfix}!`, title)
    }
}
