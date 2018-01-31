import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ArmoryBasictypographyModule } from './bootstrap/1-Utilities/basictypography/basictypography.module';
import { ArmoryTextalignmentdisplayModule } from './bootstrap/1-Utilities/textalignmentdisplay/textalignmentdisplay.module';
import { ArmoryFloatspositionModule } from './bootstrap/1-Utilities/floatsposition/floatsposition.module';
import { ArmoryColorsbackgroundModule } from './bootstrap/1-Utilities/colorsbackground/colorsbackground.module';
import { ArmorySpacingModule } from './bootstrap/1-Utilities/spacing/spacing.module';
import { ArmorySizingModule } from './bootstrap/1-Utilities/sizing/sizing.module';
import { ArmoryBreakpointsModule } from './bootstrap/1-Utilities/breakpoints/breakpoints.module';
import { ArmoryButtonsModule } from './bootstrap/2-CSSComponents/buttons/buttons.module';
import { ArmoryNavbarModule } from './bootstrap/2-CSSComponents/navbar/navbar.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        ArmoryBasictypographyModule,
        ArmoryTextalignmentdisplayModule,
        ArmoryFloatspositionModule,
        ArmoryColorsbackgroundModule,
        ArmorySpacingModule,
        ArmorySizingModule,
        ArmoryBreakpointsModule,
        ArmoryButtonsModule,
        ArmoryNavbarModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ArmoryEntityModule {}
