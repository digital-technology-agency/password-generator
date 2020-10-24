import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'app-user-item',
    templateUrl: './user-item.component.html',
    styleUrls: ['./user-item.component.scss'],
})
export class UserItemComponent implements OnInit {

    @Input() item;
    @Output() deleteClick = new EventEmitter<any>();

    constructor() {
    }

    ngOnInit(): void {
    }

    removeClick(item: any) {
        this.deleteClick.emit(item);
    }

}
