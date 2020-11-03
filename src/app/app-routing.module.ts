import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CertificatesComponent} from './certificates/certificates.component';
import {PasswordCardsComponent} from './password-cards/password-cards.component';
import {SettingViewComponent} from './setting-view/setting-view.component';

const routes: Routes = [
    {
        path: 'certificates',
        component: CertificatesComponent,
    },
    {
        path: 'password-cards',
        component: PasswordCardsComponent,
    },
    {
        path: 'settings',
        component: SettingViewComponent,
    },
    {path: '', redirectTo: 'certificates', pathMatch: 'full'},
    {path: '**', redirectTo: 'certificates'},
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {
}
