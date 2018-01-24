import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CommonModule} from '@angular/common';
import { BattlementsSharedModule } from '../../../shared';
import {GrowlModule} from 'primeng/primeng';
import {MenubarModule} from 'primeng/components/menubar/menubar';
import {InputTextModule} from 'primeng/components/inputtext/inputtext';
import {ButtonModule} from 'primeng/components/button/button';

import {
    MenuBarDemoComponent,
    menubarDemoRoute
} from './';

const primeng_STATES = [
    menubarDemoRoute
];

@NgModule({
    imports: [
        BattlementsSharedModule,
        CommonModule,
        BrowserAnimationsModule,
        MenubarModule,
        GrowlModule,
        ButtonModule,
        InputTextModule,
        RouterModule.forRoot(primeng_STATES, { useHash: true })
    ],
    declarations: [
        MenuBarDemoComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BattlementsMenuBarDemoModule {}
