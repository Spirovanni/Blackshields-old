import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ArmorySharedModule } from '../../../../shared/index';
import {
    TextalignmentdisplayService,
    TextalignmentdisplayPopupService,
    TextalignmentdisplayComponent,
    TextalignmentdisplayDetailComponent,
    TextalignmentdisplayDialogComponent,
    TextalignmentdisplayPopupComponent,
    TextalignmentdisplayDeletePopupComponent,
    TextalignmentdisplayDeleteDialogComponent,
    textalignmentdisplayRoute,
    textalignmentdisplayPopupRoute,
    TextalignmentdisplayResolvePagingParams,
} from './index';

const ENTITY_STATES = [
    ...textalignmentdisplayRoute,
    ...textalignmentdisplayPopupRoute,
];

@NgModule({
    imports: [
        ArmorySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TextalignmentdisplayComponent,
        TextalignmentdisplayDetailComponent,
        TextalignmentdisplayDialogComponent,
        TextalignmentdisplayDeleteDialogComponent,
        TextalignmentdisplayPopupComponent,
        TextalignmentdisplayDeletePopupComponent,
    ],
    entryComponents: [
        TextalignmentdisplayComponent,
        TextalignmentdisplayDialogComponent,
        TextalignmentdisplayPopupComponent,
        TextalignmentdisplayDeleteDialogComponent,
        TextalignmentdisplayDeletePopupComponent,
    ],
    providers: [
        TextalignmentdisplayService,
        TextalignmentdisplayPopupService,
        TextalignmentdisplayResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ArmoryTextalignmentdisplayModule {}
