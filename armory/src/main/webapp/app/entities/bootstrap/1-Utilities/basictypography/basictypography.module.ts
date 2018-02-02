import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ArmorySharedModule } from '../../../../shared/index';
import {
    BasictypographyService,
    BasictypographyPopupService,
    BasictypographyComponent,
    BasictypographyDetailComponent,
    BasictypographyDialogComponent,
    BasictypographyPopupComponent,
    BasictypographyDeletePopupComponent,
    BasictypographyDeleteDialogComponent,
    basictypographyRoute,
    basictypographyPopupRoute,
    BasictypographyResolvePagingParams,
} from './index';

const ENTITY_STATES = [
    ...basictypographyRoute,
    ...basictypographyPopupRoute,
];

@NgModule({
    imports: [
        ArmorySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        BasictypographyComponent,
        BasictypographyDetailComponent,
        BasictypographyDialogComponent,
        BasictypographyDeleteDialogComponent,
        BasictypographyPopupComponent,
        BasictypographyDeletePopupComponent,
    ],
    entryComponents: [
        BasictypographyComponent,
        BasictypographyDialogComponent,
        BasictypographyPopupComponent,
        BasictypographyDeleteDialogComponent,
        BasictypographyDeletePopupComponent,
    ],
    providers: [
        BasictypographyService,
        BasictypographyPopupService,
        BasictypographyResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ArmoryBasictypographyModule {}
