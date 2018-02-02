import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ArmorySharedModule } from '../../shared';
import {
    GroupsbadgesService,
    GroupsbadgesPopupService,
    GroupsbadgesComponent,
    GroupsbadgesDetailComponent,
    GroupsbadgesDialogComponent,
    GroupsbadgesPopupComponent,
    GroupsbadgesDeletePopupComponent,
    GroupsbadgesDeleteDialogComponent,
    groupsbadgesRoute,
    groupsbadgesPopupRoute,
    GroupsbadgesResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...groupsbadgesRoute,
    ...groupsbadgesPopupRoute,
];

@NgModule({
    imports: [
        ArmorySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        GroupsbadgesComponent,
        GroupsbadgesDetailComponent,
        GroupsbadgesDialogComponent,
        GroupsbadgesDeleteDialogComponent,
        GroupsbadgesPopupComponent,
        GroupsbadgesDeletePopupComponent,
    ],
    entryComponents: [
        GroupsbadgesComponent,
        GroupsbadgesDialogComponent,
        GroupsbadgesPopupComponent,
        GroupsbadgesDeleteDialogComponent,
        GroupsbadgesDeletePopupComponent,
    ],
    providers: [
        GroupsbadgesService,
        GroupsbadgesPopupService,
        GroupsbadgesResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ArmoryGroupsbadgesModule {}
