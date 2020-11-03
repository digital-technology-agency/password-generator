import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FooterComponent} from './components/footer/footer.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {TranslateModule} from '@ngx-translate/core';
import { SimpleComponent } from './layouts/simple/simple.component';
import { MenuComponent } from './components/menu/menu.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {RouterModule} from '@angular/router';
import { ContentViewComponent } from './components/content-view/content-view.component';
import {MatInputModule} from '@angular/material/input';

const COMPONENTS = [
    FooterComponent,
];

@NgModule({
    declarations: [...COMPONENTS, SimpleComponent, MenuComponent, ContentViewComponent],
    exports: [CommonModule, ...COMPONENTS, MenuComponent, SimpleComponent, ContentViewComponent],
    imports: [
        CommonModule,
        MatToolbarModule,
        MatTooltipModule,
        MatInputModule,
        TranslateModule,
        MatIconModule,
        MatButtonModule,
        MatSidenavModule,
        MatListModule,
        RouterModule,
    ],
})
export class ThemeModule {
}
