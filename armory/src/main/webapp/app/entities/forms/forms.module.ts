import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ArmorySharedModule } from '../../shared';
import {
    FormsService,
    FormsPopupService,
    FormsComponent,
    FormsDetailComponent,
    FormsDialogComponent,
    FormsPopupComponent,
    FormsDeletePopupComponent,
    FormsDeleteDialogComponent,
    formsRoute,
    formsPopupRoute,
    FormsResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...formsRoute,
    ...formsPopupRoute,
];

@NgModule({
    imports: [
        ArmorySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        FormsComponent,
        FormsDetailComponent,
        FormsDialogComponent,
        FormsDeleteDialogComponent,
        FormsPopupComponent,
        FormsDeletePopupComponent,
    ],
    entryComponents: [
        FormsComponent,
        FormsDialogComponent,
        FormsPopupComponent,
        FormsDeleteDialogComponent,
        FormsDeletePopupComponent,
    ],
    providers: [
        FormsService,
        FormsPopupService,
        FormsResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ArmoryFormsModule {}
