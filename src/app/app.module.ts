import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {UserItemComponent} from './user-item/user-item.component';
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule} from '@angular/material/dialog';
import {UserItemDialogComponent} from './user-item-dialog/user-item-dialog.component';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';

declare const electron: any;

@NgModule({
    declarations: [
        AppComponent,
        UserItemComponent,
        UserItemDialogComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        NoopAnimationsModule,
        MatDialogModule,
        FormsModule,
        MatInputModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
    entryComponents: [UserItemDialogComponent]
})
export class AppModule {
}
