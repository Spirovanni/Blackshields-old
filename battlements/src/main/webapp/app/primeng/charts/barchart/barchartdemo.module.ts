import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BattlementsSharedModule } from '../../../shared';
import { ChartModule } from 'primeng/primeng';

import {
    BarchartDemoComponent,
    barchartDemoRoute
} from './';

const primeng_STATES = [
    barchartDemoRoute
];

@NgModule({
    imports: [
        BattlementsSharedModule,
        ChartModule,
        RouterModule.forRoot(primeng_STATES, { useHash: true })
    ],
    declarations: [
        BarchartDemoComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BattlementsBarchartDemoModule {}
