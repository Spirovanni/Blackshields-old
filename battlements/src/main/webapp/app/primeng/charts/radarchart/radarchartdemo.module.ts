import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BattlementsSharedModule } from '../../../shared';
import { ChartModule } from 'primeng/primeng';

import {
    RadarchartDemoComponent,
    radarchartDemoRoute
} from '../../charts/radarchart';

const primeng_STATES = [
    radarchartDemoRoute
];

@NgModule({
    imports: [
        BattlementsSharedModule,
        ChartModule,
        RouterModule.forRoot(primeng_STATES, { useHash: true })
    ],
    declarations: [
        RadarchartDemoComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BattlementsRadarchartDemoModule {}
