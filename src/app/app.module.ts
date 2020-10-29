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
import {ClipboardModule} from 'ngx-clipboard';
import {ToastrModule} from 'ngx-toastr';
import {MatTooltipModule} from '@angular/material/tooltip';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient} from '@angular/common/http';
import {MatSelectModule} from '@angular/material/select';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

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
        ClipboardModule,
        ToastrModule.forRoot(),
        TranslateModule.forRoot(
            {
                defaultLanguage: 'en',
            },
        ),
        MatTooltipModule,
        MatSelectModule,
    ],
    exports: [],
    providers: [],
    bootstrap: [AppComponent],
    entryComponents: [UserItemDialogComponent],
})
export class AppModule {
}
