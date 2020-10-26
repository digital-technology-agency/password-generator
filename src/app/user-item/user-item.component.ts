import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {ClipboardService} from 'ngx-clipboard';
import {ToastrService} from 'ngx-toastr';

declare var electron: any;

@Component({
    selector: 'app-user-item',
    templateUrl: './user-item.component.html',
    styleUrls: ['./user-item.component.scss'],
})
export class UserItemComponent implements OnInit {

    @Input() item;
    @Output() deleteClick = new EventEmitter<any>();
    hidePassword: boolean = true;


    constructor(private _clipboardService: ClipboardService,
                private toastr: ToastrService) {
    }

    ngOnInit(): void {
    }

    removeClick(item: any) {
        this.deleteClick.emit(item);
    }

    openDefaultBrowser() {
        electron.shell.openExternal(`http://${this.item.site}`)
    }

    copy() {
        this._clipboardService.copy(this.item.value);
        this.toastr.success(`Password by ${this.item.site} - copied to clipboard!`, 'Clipboard')
    }
}
