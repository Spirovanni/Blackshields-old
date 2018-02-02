import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ArmorySharedModule } from '../../shared';
import {
    InputgroupsService,
    InputgroupsPopupService,
    InputgroupsComponent,
    InputgroupsDetailComponent,
    InputgroupsDialogComponent,
    InputgroupsPopupComponent,
    InputgroupsDeletePopupComponent,
    InputgroupsDeleteDialogComponent,
    inputgroupsRoute,
    inputgroupsPopupRoute,
    InputgroupsResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...inputgroupsRoute,
    ...inputgroupsPopupRoute,
];

@NgModule({
    imports: [
        ArmorySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        InputgroupsComponent,
        InputgroupsDetailComponent,
        InputgroupsDialogComponent,
        InputgroupsDeleteDialogComponent,
        InputgroupsPopupComponent,
        InputgroupsDeletePopupComponent,
    ],
    entryComponents: [
        InputgroupsComponent,
        InputgroupsDialogComponent,
        InputgroupsPopupComponent,
        InputgroupsDeleteDialogComponent,
        InputgroupsDeletePopupComponent,
    ],
    providers: [
        InputgroupsService,
        InputgroupsPopupService,
        InputgroupsResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ArmoryInputgroupsModule {}
