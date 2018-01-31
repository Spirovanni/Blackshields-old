import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ArmorySharedModule } from '../../../../shared/index';
import {
    ColorsbackgroundService,
    ColorsbackgroundPopupService,
    ColorsbackgroundComponent,
    ColorsbackgroundDetailComponent,
    ColorsbackgroundDialogComponent,
    ColorsbackgroundPopupComponent,
    ColorsbackgroundDeletePopupComponent,
    ColorsbackgroundDeleteDialogComponent,
    colorsbackgroundRoute,
    colorsbackgroundPopupRoute,
    ColorsbackgroundResolvePagingParams,
} from './index';

const ENTITY_STATES = [
    ...colorsbackgroundRoute,
    ...colorsbackgroundPopupRoute,
];

@NgModule({
    imports: [
        ArmorySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ColorsbackgroundComponent,
        ColorsbackgroundDetailComponent,
        ColorsbackgroundDialogComponent,
        ColorsbackgroundDeleteDialogComponent,
        ColorsbackgroundPopupComponent,
        ColorsbackgroundDeletePopupComponent,
    ],
    entryComponents: [
        ColorsbackgroundComponent,
        ColorsbackgroundDialogComponent,
        ColorsbackgroundPopupComponent,
        ColorsbackgroundDeleteDialogComponent,
        ColorsbackgroundDeletePopupComponent,
    ],
    providers: [
        ColorsbackgroundService,
        ColorsbackgroundPopupService,
        ColorsbackgroundResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ArmoryColorsbackgroundModule {}
