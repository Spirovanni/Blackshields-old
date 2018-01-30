import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ArmorySharedModule } from '../../shared';
import {
    SizingService,
    SizingPopupService,
    SizingComponent,
    SizingDetailComponent,
    SizingDialogComponent,
    SizingPopupComponent,
    SizingDeletePopupComponent,
    SizingDeleteDialogComponent,
    sizingRoute,
    sizingPopupRoute,
    SizingResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...sizingRoute,
    ...sizingPopupRoute,
];

@NgModule({
    imports: [
        ArmorySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        SizingComponent,
        SizingDetailComponent,
        SizingDialogComponent,
        SizingDeleteDialogComponent,
        SizingPopupComponent,
        SizingDeletePopupComponent,
    ],
    entryComponents: [
        SizingComponent,
        SizingDialogComponent,
        SizingPopupComponent,
        SizingDeleteDialogComponent,
        SizingDeletePopupComponent,
    ],
    providers: [
        SizingService,
        SizingPopupService,
        SizingResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ArmorySizingModule {}
