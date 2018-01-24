import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CommonModule} from '@angular/common';
import { BattlementsSharedModule } from '../../../shared';
import {GrowlModule} from 'primeng/primeng';
import {MenuModule} from 'primeng/components/menu/menu';
import {ButtonModule} from 'primeng/components/button/button';

import {
    MenuDemoComponent,
    menuDemoRoute
} from './';

const primeng_STATES = [
    menuDemoRoute
];

@NgModule({
    imports: [
        BattlementsSharedModule,
        CommonModule,
        BrowserAnimationsModule,
        MenuModule,
        GrowlModule,
        ButtonModule,
        RouterModule.forRoot(primeng_STATES, { useHash: true })
    ],
    declarations: [
        MenuDemoComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BattlementsMenuDemoModule {}
