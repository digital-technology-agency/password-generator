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
import {TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient} from '@angular/common/http';
import {CertificatesComponent} from './certificates/certificates.component';
import {PasswordCardsComponent} from './password-cards/password-cards.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {OverlayModule} from '@angular/cdk/overlay';
import {PortalModule} from '@angular/cdk/portal';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatTooltipModule} from '@angular/material/tooltip';
import {NewRsaCertComponent} from './dialogs/certs/new-rsa-cert/new-rsa-cert.component';
import {MatSelectModule} from '@angular/material/select';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

const ENTRY_COMPONENTS = [
    UserItemDialogComponent, NewRsaCertComponent,
];

const MATERIAL_MODULES = [
    MatDialogModule,
    MatToolbarModule,
    MatInputModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatListModule,
    MatMenuModule,
    MatTooltipModule,
];

@NgModule({
    declarations: [
        ...ENTRY_COMPONENTS,
        AppComponent,
        UserItemComponent,
        CertificatesComponent,
        PasswordCardsComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        NoopAnimationsModule,
        FormsModule,
        ClipboardModule,
        ToastrModule.forRoot(),
        TranslateModule.forRoot(
            {
                defaultLanguage: 'en',
            },
        ),
        OverlayModule,
        PortalModule,
        ScrollingModule,
        ...MATERIAL_MODULES,
        MatSelectModule,
    ],
    exports: [],
    providers: [],
    bootstrap: [AppComponent],
    entryComponents: [...ENTRY_COMPONENTS],
})
export class AppModule {
}
