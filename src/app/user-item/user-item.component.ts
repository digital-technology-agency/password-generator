import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {ClipboardService} from 'ngx-clipboard';
import {ToastrService} from 'ngx-toastr';
import {ElectronService} from '../@core/electron.service';

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
                private electronService: ElectronService) {
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
        this.toastr.success(`Password by ${this.item.site} - copied to clipboard!`, 'Clipboard')
    }

    copyLogin() {
        this._clipboardService.copy(this.item.login);
        this.toastr.success(`Login by ${this.item.site} - copied to clipboard!`, 'Clipboard')
    }
}
