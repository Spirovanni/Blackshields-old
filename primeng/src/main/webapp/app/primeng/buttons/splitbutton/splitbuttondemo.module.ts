import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CommonModule} from '@angular/common';
import { PrimengSharedModule } from '../../../shared';
import {SplitButtonModule} from 'primeng/primeng';
import {WizardModule} from 'primeng-extensions/components/wizard/wizard.module';
import {GrowlModule} from 'primeng/primeng';

import {
    SplitbuttonDemoComponent,
    splitbuttonDemoRoute
} from './';

const primeng_STATES = [
    splitbuttonDemoRoute
];

@NgModule({
    imports: [
        PrimengSharedModule,
        CommonModule,
        BrowserAnimationsModule,
        SplitButtonModule,
        GrowlModule,
        WizardModule,
        RouterModule.forRoot(primeng_STATES, { useHash: true })
    ],
    declarations: [
        SplitbuttonDemoComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PrimengSplitbuttonDemoModule {}
