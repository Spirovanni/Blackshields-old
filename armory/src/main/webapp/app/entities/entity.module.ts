import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ArmoryBasictypographyModule } from './bootstrap/basictypography/basictypography.module';
import { ArmoryTextalignmentdisplayModule } from './bootstrap/textalignmentdisplay/textalignmentdisplay.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        ArmoryBasictypographyModule,
        ArmoryTextalignmentdisplayModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ArmoryEntityModule {}
