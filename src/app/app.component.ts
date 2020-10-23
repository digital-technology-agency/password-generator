import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
    title = 'Password Generator';
    cards: any[] = [];

    ngOnInit() {
        this.cards = [
            {id: 0, name: 'www.example.com', value: '123'},
            {id: 0, name: 'auth.ru', value: '123'},
            {id: 0, name: 'demo.com', value: '123'},
            {id: 0, name: 'vk.ru', value: '123'},
        ]
    }

    ngOnDestroy() {
    }

    generate() {
        console.debug('Hello');
    }
}
