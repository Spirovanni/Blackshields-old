import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ArmorySharedModule } from '../../../shared/index';
import {
    SpacingService,
    SpacingPopupService,
    SpacingComponent,
    SpacingDetailComponent,
    SpacingDialogComponent,
    SpacingPopupComponent,
    SpacingDeletePopupComponent,
    SpacingDeleteDialogComponent,
    spacingRoute,
    spacingPopupRoute,
    SpacingResolvePagingParams,
} from './index';

const ENTITY_STATES = [
    ...spacingRoute,
    ...spacingPopupRoute,
];

@NgModule({
    imports: [
        ArmorySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        SpacingComponent,
        SpacingDetailComponent,
        SpacingDialogComponent,
        SpacingDeleteDialogComponent,
        SpacingPopupComponent,
        SpacingDeletePopupComponent,
    ],
    entryComponents: [
        SpacingComponent,
        SpacingDialogComponent,
        SpacingPopupComponent,
        SpacingDeleteDialogComponent,
        SpacingDeletePopupComponent,
    ],
    providers: [
        SpacingService,
        SpacingPopupService,
        SpacingResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ArmorySpacingModule {}
