import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ArmorySharedModule } from '../../../shared/index';
import {
    FloatspositionService,
    FloatspositionPopupService,
    FloatspositionComponent,
    FloatspositionDetailComponent,
    FloatspositionDialogComponent,
    FloatspositionPopupComponent,
    FloatspositionDeletePopupComponent,
    FloatspositionDeleteDialogComponent,
    floatspositionRoute,
    floatspositionPopupRoute,
    FloatspositionResolvePagingParams,
} from './index';

const ENTITY_STATES = [
    ...floatspositionRoute,
    ...floatspositionPopupRoute,
];

@NgModule({
    imports: [
        ArmorySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        FloatspositionComponent,
        FloatspositionDetailComponent,
        FloatspositionDialogComponent,
        FloatspositionDeleteDialogComponent,
        FloatspositionPopupComponent,
        FloatspositionDeletePopupComponent,
    ],
    entryComponents: [
        FloatspositionComponent,
        FloatspositionDialogComponent,
        FloatspositionPopupComponent,
        FloatspositionDeleteDialogComponent,
        FloatspositionDeletePopupComponent,
    ],
    providers: [
        FloatspositionService,
        FloatspositionPopupService,
        FloatspositionResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ArmoryFloatspositionModule {}
