import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ArmoryBasictypographyModule } from './bootstrap/basictypography/basictypography.module';
import { ArmoryTextalignmentdisplayModule } from './bootstrap/textalignmentdisplay/textalignmentdisplay.module';
import { ArmoryFloatspositionModule } from './bootstrap/floatsposition/floatsposition.module';
import { ArmoryColorsbackgroundModule } from './bootstrap/colorsbackground/colorsbackground.module';
import { ArmorySpacingModule } from './bootstrap/spacing/spacing.module';
import { ArmorySizingModule } from './sizing/sizing.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        ArmoryBasictypographyModule,
        ArmoryTextalignmentdisplayModule,
        ArmoryFloatspositionModule,
        ArmoryColorsbackgroundModule,
        ArmorySpacingModule,
        ArmorySizingModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ArmoryEntityModule {}
