import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ArmorySharedModule } from '../../../../shared/index';
import {
    ButtonsService,
    ButtonsPopupService,
    ButtonsComponent,
    ButtonsDetailComponent,
    ButtonsDialogComponent,
    ButtonsPopupComponent,
    ButtonsDeletePopupComponent,
    ButtonsDeleteDialogComponent,
    buttonsRoute,
    buttonsPopupRoute,
    ButtonsResolvePagingParams,
} from './index';

const ENTITY_STATES = [
    ...buttonsRoute,
    ...buttonsPopupRoute,
];

@NgModule({
    imports: [
        ArmorySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ButtonsComponent,
        ButtonsDetailComponent,
        ButtonsDialogComponent,
        ButtonsDeleteDialogComponent,
        ButtonsPopupComponent,
        ButtonsDeletePopupComponent,
    ],
    entryComponents: [
        ButtonsComponent,
        ButtonsDialogComponent,
        ButtonsPopupComponent,
        ButtonsDeleteDialogComponent,
        ButtonsDeletePopupComponent,
    ],
    providers: [
        ButtonsService,
        ButtonsPopupService,
        ButtonsResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ArmoryButtonsModule {}
