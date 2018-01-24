import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BattlementsSharedModule } from '../../../shared';
import { ChartModule } from 'primeng/primeng';

import {
    DoughnutchartDemoComponent,
    doughnutchartDemoRoute
} from '../../charts/doughnutchart';

const primeng_STATES = [
    doughnutchartDemoRoute
];

@NgModule({
    imports: [
        BattlementsSharedModule,
        ChartModule,
        RouterModule.forRoot(primeng_STATES, { useHash: true })
    ],
    declarations: [
        DoughnutchartDemoComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BattlementsDoughnutchartDemoModule {}
