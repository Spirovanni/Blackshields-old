
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { BattlementsButtonDemoModule } from './buttons/button/buttondemo.module';
import { BattlementsSplitbuttonDemoModule } from './buttons/splitbutton/splitbuttondemo.module';

import { BattlementsDialogDemoModule } from './overlay/dialog/dialogdemo.module';
import { BattlementsConfirmDialogDemoModule } from './overlay/confirmdialog/confirmdialogdemo.module';
import { BattlementsLightboxDemoModule } from './overlay/lightbox/lightboxdemo.module';
import { BattlementsTooltipDemoModule } from './overlay/tooltip/tooltipdemo.module';
import { BattlementsOverlayPanelDemoModule } from './overlay/overlaypanel/overlaypaneldemo.module';
import { BattlementsSideBarDemoModule } from './overlay/sidebar/sidebardemo.module';

import { BattlementsKeyFilterDemoModule } from './inputs/keyfilter/keyfilterdemo.module';
import { BattlementsInputTextDemoModule } from './inputs/inputtext/inputtextdemo.module';
import { BattlementsInputTextAreaDemoModule } from './inputs/inputtextarea/inputtextareademo.module';
import { BattlementsInputGroupDemoModule } from './inputs/inputgroup/inputgroupdemo.module';
import { BattlementsCalendarDemoModule } from './inputs/calendar/calendardemo.module';
import { BattlementsCheckboxDemoModule } from './inputs/checkbox/checkboxdemo.module';
import { BattlementsChipsDemoModule } from './inputs/chips/chipsdemo.module';
import { BattlementsColorPickerDemoModule } from './inputs/colorpicker/colorpickerdemo.module';
import { BattlementsInputMaskDemoModule } from './inputs/inputmask/inputmaskdemo.module';
import { BattlementsInputSwitchDemoModule } from './inputs/inputswitch/inputswitchdemo.module';
import { BattlementsPasswordIndicatorDemoModule } from './inputs/passwordindicator/passwordindicatordemo.module';
import { BattlementsAutoCompleteDemoModule } from './inputs/autocomplete/autocompletedemo.module';
import { BattlementsSliderDemoModule } from './inputs/slider/sliderdemo.module';
import { BattlementsSpinnerDemoModule } from './inputs/spinner/spinnerdemo.module';
import { BattlementsRatingDemoModule } from './inputs/rating/ratingdemo.module';
import { BattlementsSelectDemoModule } from './inputs/select/selectdemo.module';
import { BattlementsSelectButtonDemoModule } from './inputs/selectbutton/selectbuttondemo.module';
import { BattlementsListboxDemoModule } from './inputs/listbox/listboxdemo.module';
import { BattlementsRadioButtonDemoModule } from './inputs/radiobutton/radiobuttondemo.module';
import { BattlementsToggleButtonDemoModule } from './inputs/togglebutton/togglebuttondemo.module';
import { BattlementsEditorDemoModule } from './inputs/editor/editordemo.module';

import { BattlementsGrowlDemoModule } from './messages/growl/growldemo.module';
import { BattlementsMessagesDemoModule } from './messages/messages/messagesdemo.module';
import { BattlementsGalleriaDemoModule } from './multimedia/galleria/galleriademo.module';

import { BattlementsFileUploadDemoModule } from './fileupload/fileupload/fileuploaddemo.module';

import { BattlementsAccordionDemoModule } from './panel/accordion/accordiondemo.module';
import { BattlementsPanelDemoModule } from './panel/panel/paneldemo.module';
import { BattlementsTabViewDemoModule } from './panel/tabview/tabviewdemo.module';
import { BattlementsFieldsetDemoModule } from './panel/fieldset/fieldsetdemo.module';
import { BattlementsToolbarDemoModule } from './panel/toolbar/toolbardemo.module';
import { BattlementsGridDemoModule } from './panel/grid/griddemo.module';
import { BattlementsScrollPanelDemoModule } from './panel/scrollpanel/scrollpaneldemo.module';
import { BattlementsCardDemoModule } from './panel/card/carddemo.module';

import { BattlementsDataTableDemoModule } from './data/datatable/datatabledemo.module';
import { BattlementsDataGridDemoModule } from './data/datagrid/datagriddemo.module';
import { BattlementsDataListDemoModule } from './data/datalist/datalistdemo.module';
import { BattlementsDataScrollerDemoModule } from './data/datascroller/datascrollerdemo.module';
import { BattlementsPickListDemoModule } from './data/picklist/picklistdemo.module';
import { BattlementsOrderListDemoModule } from './data/orderlist/orderlistdemo.module';
import { BattlementsScheduleDemoModule } from './data/schedule/scheduledemo.module';
import { BattlementsTreeDemoModule } from './data/tree/treedemo.module';
import { BattlementsTreeTableDemoModule } from './data/treetable/treetabledemo.module';
import { BattlementsPaginatorDemoModule } from './data/paginator/paginatordemo.module';
import { BattlementsGmapDemoModule } from './data/gmap/gmapdemo.module';
import { BattlementsOrgChartDemoModule } from './data/orgchart/orgchartdemo.module';
import { BattlementsCarouselDemoModule } from './data/carousel/carouseldemo.module';

import { BattlementsBarchartDemoModule } from './charts/barchart/barchartdemo.module';
import { BattlementsDoughnutchartDemoModule } from './charts/doughnutchart/doughnutchartdemo.module';
import { BattlementsLinechartDemoModule } from './charts/linechart/linechartdemo.module';
import { BattlementsPiechartDemoModule } from './charts/piechart/piechartdemo.module';
import { BattlementsPolarareachartDemoModule } from './charts/polarareachart/polarareachartdemo.module';
import { BattlementsRadarchartDemoModule } from './charts/radarchart/radarchartdemo.module';

import { BattlementsDragDropDemoModule } from './dragdrop/dragdrop/dragdropdemo.module';

import { BattlementsMenuDemoModule } from './menu/menu/menudemo.module';
import { BattlementsContextMenuDemoModule } from './menu/contextmenu/contextmenudemo.module';
import { BattlementsPanelMenuDemoModule } from './menu/panelmenu/panelmenudemo.module';
import { BattlementsStepsDemoModule } from './menu/steps/stepsdemo.module';
import { BattlementsTieredMenuDemoModule } from './menu/tieredmenu/tieredmenudemo.module';
import { BattlementsBreadcrumbDemoModule } from './menu/breadcrumb/breadcrumbdemo.module';
import { BattlementsMegaMenuDemoModule } from './menu/megamenu/megamenudemo.module';
import { BattlementsMenuBarDemoModule } from './menu/menubar/menubardemo.module';
import { BattlementsSlideMenuDemoModule } from './menu/slidemenu/slidemenudemo.module';
import { BattlementsTabMenuDemoModule } from './menu/tabmenu/tabmenudemo.module';

import { BattlementsBlockUIDemoModule } from './misc/blockui/blockuidemo.module';
import { BattlementsCaptchaDemoModule } from './misc/captcha/captchademo.module';
import { BattlementsDeferDemoModule } from './misc/defer/deferdemo.module';
import { BattlementsInplaceDemoModule } from './misc/inplace/inplacedemo.module';
import { BattlementsProgressBarDemoModule } from './misc/progressbar/progressbardemo.module';
import { BattlementsRTLDemoModule } from './misc/rtl/rtldemo.module';
import { BattlementsTerminalDemoModule } from './misc/terminal/terminaldemo.module';
import { BattlementsValidationDemoModule } from './misc/validation/validationdemo.module';
import { BattlementsProgressSpinnerDemoModule } from './misc/progressspinner/progressspinnerdemo.module';

@NgModule({
    imports: [

        BattlementsMenuDemoModule,
        BattlementsContextMenuDemoModule,
        BattlementsPanelMenuDemoModule,
        BattlementsStepsDemoModule,
        BattlementsTieredMenuDemoModule,
        BattlementsBreadcrumbDemoModule,
        BattlementsMegaMenuDemoModule,
        BattlementsMenuBarDemoModule,
        BattlementsSlideMenuDemoModule,
        BattlementsTabMenuDemoModule,

        BattlementsBlockUIDemoModule,
        BattlementsCaptchaDemoModule,
        BattlementsDeferDemoModule,
        BattlementsInplaceDemoModule,
        BattlementsProgressBarDemoModule,
        BattlementsInputMaskDemoModule,
        BattlementsRTLDemoModule,
        BattlementsTerminalDemoModule,
        BattlementsValidationDemoModule,

        BattlementsButtonDemoModule,
        BattlementsSplitbuttonDemoModule,

        BattlementsInputTextDemoModule,
        BattlementsInputTextAreaDemoModule,
        BattlementsInputGroupDemoModule,
        BattlementsCalendarDemoModule,
        BattlementsChipsDemoModule,
        BattlementsInputMaskDemoModule,
        BattlementsInputSwitchDemoModule,
        BattlementsPasswordIndicatorDemoModule,
        BattlementsAutoCompleteDemoModule,
        BattlementsSliderDemoModule,
        BattlementsSpinnerDemoModule,
        BattlementsRatingDemoModule,
        BattlementsSelectDemoModule,
        BattlementsSelectButtonDemoModule,
        BattlementsListboxDemoModule,
        BattlementsRadioButtonDemoModule,
        BattlementsToggleButtonDemoModule,
        BattlementsEditorDemoModule,
        BattlementsColorPickerDemoModule,
        BattlementsCheckboxDemoModule,
        BattlementsKeyFilterDemoModule,

        BattlementsGrowlDemoModule,
        BattlementsMessagesDemoModule,
        BattlementsGalleriaDemoModule,

        BattlementsFileUploadDemoModule,

        BattlementsAccordionDemoModule,
        BattlementsPanelDemoModule,
        BattlementsTabViewDemoModule,
        BattlementsFieldsetDemoModule,
        BattlementsToolbarDemoModule,
        BattlementsGridDemoModule,
        BattlementsScrollPanelDemoModule,
        BattlementsCardDemoModule,

        BattlementsBarchartDemoModule,
        BattlementsDoughnutchartDemoModule,
        BattlementsLinechartDemoModule,
        BattlementsPiechartDemoModule,
        BattlementsPolarareachartDemoModule,
        BattlementsRadarchartDemoModule,

        BattlementsDragDropDemoModule,

        BattlementsDialogDemoModule,
        BattlementsConfirmDialogDemoModule,
        BattlementsLightboxDemoModule,
        BattlementsTooltipDemoModule,
        BattlementsOverlayPanelDemoModule,
        BattlementsSideBarDemoModule,

        BattlementsDataTableDemoModule,
        BattlementsDataGridDemoModule,
        BattlementsDataListDemoModule,
        BattlementsDataScrollerDemoModule,
        BattlementsScheduleDemoModule,
        BattlementsOrderListDemoModule,
        BattlementsPickListDemoModule,
        BattlementsTreeDemoModule,
        BattlementsTreeTableDemoModule,
        BattlementsPaginatorDemoModule,
        BattlementsOrgChartDemoModule,
        BattlementsGmapDemoModule,
        BattlementsCarouselDemoModule,
        BattlementsProgressSpinnerDemoModule

    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BattlementsprimengModule {}
