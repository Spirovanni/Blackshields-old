import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ArmorySharedModule } from '../../../../shared/index';
import {
    BreakpointsService,
    BreakpointsPopupService,
    BreakpointsComponent,
    BreakpointsDetailComponent,
    BreakpointsDialogComponent,
    BreakpointsPopupComponent,
    BreakpointsDeletePopupComponent,
    BreakpointsDeleteDialogComponent,
    breakpointsRoute,
    breakpointsPopupRoute,
    BreakpointsResolvePagingParams,
} from './index';

const ENTITY_STATES = [
    ...breakpointsRoute,
    ...breakpointsPopupRoute,
];

@NgModule({
    imports: [
        ArmorySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        BreakpointsComponent,
        BreakpointsDetailComponent,
        BreakpointsDialogComponent,
        BreakpointsDeleteDialogComponent,
        BreakpointsPopupComponent,
        BreakpointsDeletePopupComponent,
    ],
    entryComponents: [
        BreakpointsComponent,
        BreakpointsDialogComponent,
        BreakpointsPopupComponent,
        BreakpointsDeleteDialogComponent,
        BreakpointsDeletePopupComponent,
    ],
    providers: [
        BreakpointsService,
        BreakpointsPopupService,
        BreakpointsResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ArmoryBreakpointsModule {}
