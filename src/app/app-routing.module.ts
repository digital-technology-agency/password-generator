import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CertificatesComponent} from './certificates/certificates.component';
import {PasswordCardsComponent} from './password-cards/password-cards.component';
import {AuthenticatorComponent} from './authenticator/authenticator.component';

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
        path: 'authenticator',
        component: AuthenticatorComponent,
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {
}
