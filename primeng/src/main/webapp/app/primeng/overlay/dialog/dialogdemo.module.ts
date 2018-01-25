import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PrimengSharedModule } from '../../../shared';
import {ButtonModule} from 'primeng/primeng';
import {DialogModule} from 'primeng/primeng';
import {GrowlModule} from 'primeng/primeng';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {WizardModule} from 'primeng-extensions/components/wizard/wizard.module';

import {
    DialogDemoComponent,
    dialogDemoRoute
} from './';

const primeng_STATES = [
    dialogDemoRoute
];

@NgModule({
    imports: [
        PrimengSharedModule,
        ButtonModule,
        DialogModule,
        GrowlModule,
        BrowserAnimationsModule,
        WizardModule,
        RouterModule.forRoot(primeng_STATES, { useHash: true })
    ],
    declarations: [
        DialogDemoComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PrimengDialogDemoModule {}
