import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ArmorySharedModule } from '../../../../shared/index';
import {
    NavbarService,
    NavbarPopupService,
    NavbarComponent,
    NavbarDetailComponent,
    NavbarDialogComponent,
    NavbarPopupComponent,
    NavbarDeletePopupComponent,
    NavbarDeleteDialogComponent,
    navbarRoute,
    navbarPopupRoute,
    NavbarResolvePagingParams,
} from './index';

const ENTITY_STATES = [
    ...navbarRoute,
    ...navbarPopupRoute,
];

@NgModule({
    imports: [
        ArmorySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        NavbarComponent,
        NavbarDetailComponent,
        NavbarDialogComponent,
        NavbarDeleteDialogComponent,
        NavbarPopupComponent,
        NavbarDeletePopupComponent,
    ],
    entryComponents: [
        NavbarComponent,
        NavbarDialogComponent,
        NavbarPopupComponent,
        NavbarDeleteDialogComponent,
        NavbarDeletePopupComponent,
    ],
    providers: [
        NavbarService,
        NavbarPopupService,
        NavbarResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ArmoryNavbarModule {}
