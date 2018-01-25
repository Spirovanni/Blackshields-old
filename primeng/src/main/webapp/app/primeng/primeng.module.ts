
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { PrimengButtonDemoModule } from './buttons/button/buttondemo.module';
import { PrimengSplitbuttonDemoModule } from './buttons/splitbutton/splitbuttondemo.module';

import { PrimengDialogDemoModule } from './overlay/dialog/dialogdemo.module';
import { PrimengConfirmDialogDemoModule } from './overlay/confirmdialog/confirmdialogdemo.module';
import { PrimengLightboxDemoModule } from './overlay/lightbox/lightboxdemo.module';
import { PrimengTooltipDemoModule } from './overlay/tooltip/tooltipdemo.module';
import { PrimengOverlayPanelDemoModule } from './overlay/overlaypanel/overlaypaneldemo.module';
import { PrimengSideBarDemoModule } from './overlay/sidebar/sidebardemo.module';

import { PrimengInputTextDemoModule } from './inputs/inputtext/inputtextdemo.module';
import { PrimengInputTextAreaDemoModule } from './inputs/inputtextarea/inputtextareademo.module';
import { PrimengInputGroupDemoModule } from './inputs/inputgroup/inputgroupdemo.module';
import { PrimengCalendarDemoModule } from './inputs/calendar/calendardemo.module';
import { PrimengCheckboxDemoModule } from './inputs/checkbox/checkboxdemo.module';
import { PrimengChipsDemoModule } from './inputs/chips/chipsdemo.module';
import { PrimengColorPickerDemoModule } from './inputs/colorpicker/colorpickerdemo.module';
import { PrimengInputMaskDemoModule } from './inputs/inputmask/inputmaskdemo.module';
import { PrimengInputSwitchDemoModule } from './inputs/inputswitch/inputswitchdemo.module';
import { PrimengPasswordIndicatorDemoModule } from './inputs/passwordindicator/passwordindicatordemo.module';
import { PrimengAutoCompleteDemoModule } from './inputs/autocomplete/autocompletedemo.module';
import { PrimengSliderDemoModule } from './inputs/slider/sliderdemo.module';
import { PrimengSpinnerDemoModule } from './inputs/spinner/spinnerdemo.module';
import { PrimengRatingDemoModule } from './inputs/rating/ratingdemo.module';
import { PrimengSelectDemoModule } from './inputs/select/selectdemo.module';
import { PrimengSelectButtonDemoModule } from './inputs/selectbutton/selectbuttondemo.module';
import { PrimengListboxDemoModule } from './inputs/listbox/listboxdemo.module';
import { PrimengRadioButtonDemoModule } from './inputs/radiobutton/radiobuttondemo.module';
import { PrimengToggleButtonDemoModule } from './inputs/togglebutton/togglebuttondemo.module';
import { PrimengEditorDemoModule } from './inputs/editor/editordemo.module';

import { PrimengGrowlDemoModule } from './messages/growl/growldemo.module';
import { PrimengMessagesDemoModule } from './messages/messages/messagesdemo.module';
import { PrimengGalleriaDemoModule } from './multimedia/galleria/galleriademo.module';

import { PrimengFileUploadDemoModule } from './fileupload/fileupload/fileuploaddemo.module';

import { PrimengAccordionDemoModule } from './panel/accordion/accordiondemo.module';
import { PrimengPanelDemoModule } from './panel/panel/paneldemo.module';
import { PrimengTabViewDemoModule } from './panel/tabview/tabviewdemo.module';
import { PrimengFieldsetDemoModule } from './panel/fieldset/fieldsetdemo.module';
import { PrimengToolbarDemoModule } from './panel/toolbar/toolbardemo.module';
import { PrimengGridDemoModule } from './panel/grid/griddemo.module';

import { PrimengDataTableDemoModule } from './data/datatable/datatabledemo.module';
import { PrimengDataGridDemoModule } from './data/datagrid/datagriddemo.module';
import { PrimengDataListDemoModule } from './data/datalist/datalistdemo.module';
import { PrimengDataScrollerDemoModule } from './data/datascroller/datascrollerdemo.module';
import { PrimengPickListDemoModule } from './data/picklist/picklistdemo.module';
import { PrimengOrderListDemoModule } from './data/orderlist/orderlistdemo.module';
import { PrimengScheduleDemoModule } from './data/schedule/scheduledemo.module';
import { PrimengTreeDemoModule } from './data/tree/treedemo.module';
import { PrimengTreeTableDemoModule } from './data/treetable/treetabledemo.module';
import { PrimengPaginatorDemoModule } from './data/paginator/paginatordemo.module';
import { PrimengGmapDemoModule } from './data/gmap/gmapdemo.module';
import { PrimengOrgChartDemoModule } from './data/orgchart/orgchartdemo.module';
import { PrimengCarouselDemoModule } from './data/carousel/carouseldemo.module';

import { PrimengBarchartDemoModule } from './charts/barchart/barchartdemo.module';
import { PrimengDoughnutchartDemoModule } from './charts/doughnutchart/doughnutchartdemo.module';
import { PrimengLinechartDemoModule } from './charts/linechart/linechartdemo.module';
import { PrimengPiechartDemoModule } from './charts/piechart/piechartdemo.module';
import { PrimengPolarareachartDemoModule } from './charts/polarareachart/polarareachartdemo.module';
import { PrimengRadarchartDemoModule } from './charts/radarchart/radarchartdemo.module';

import { PrimengDragDropDemoModule } from './dragdrop/dragdrop/dragdropdemo.module';


import { PrimengMenuDemoModule } from './menu/menu/menudemo.module';
import { PrimengContextMenuDemoModule } from './menu/contextmenu/contextmenudemo.module';
import { PrimengPanelMenuDemoModule } from './menu/panelmenu/panelmenudemo.module';
import { PrimengStepsDemoModule } from './menu/steps/stepsdemo.module';
import { PrimengTieredMenuDemoModule } from './menu/tieredmenu/tieredmenudemo.module';
import { PrimengBreadcrumbDemoModule } from './menu/breadcrumb/breadcrumbdemo.module';
import { PrimengMegaMenuDemoModule } from './menu/megamenu/megamenudemo.module';
import { PrimengMenuBarDemoModule } from './menu/menubar/menubardemo.module';
import { PrimengSlideMenuDemoModule } from './menu/slidemenu/slidemenudemo.module';
import { PrimengTabMenuDemoModule } from './menu/tabmenu/tabmenudemo.module';

import { PrimengBlockUIDemoModule } from './misc/blockui/blockuidemo.module';
import { PrimengCaptchaDemoModule } from './misc/captcha/captchademo.module';
import { PrimengDeferDemoModule } from './misc/defer/deferdemo.module';
import { PrimengInplaceDemoModule } from './misc/inplace/inplacedemo.module';
import { PrimengProgressBarDemoModule } from './misc/progressbar/progressbardemo.module';
import { PrimengRTLDemoModule } from './misc/rtl/rtldemo.module';
import { PrimengTerminalDemoModule } from './misc/terminal/terminaldemo.module';
import { PrimengValidationDemoModule } from './misc/validation/validationdemo.module';
import { PrimengProgressSpinnerDemoModule } from './misc/progressspinner/progressspinnerdemo.module';

@NgModule({
    imports: [

        PrimengMenuDemoModule,
        PrimengContextMenuDemoModule,
        PrimengPanelMenuDemoModule,
        PrimengStepsDemoModule,
        PrimengTieredMenuDemoModule,
        PrimengBreadcrumbDemoModule,
        PrimengMegaMenuDemoModule,
        PrimengMenuBarDemoModule,
        PrimengSlideMenuDemoModule,
        PrimengTabMenuDemoModule,

        PrimengBlockUIDemoModule,
        PrimengCaptchaDemoModule,
        PrimengDeferDemoModule,
        PrimengInplaceDemoModule,
        PrimengProgressBarDemoModule,
        PrimengInputMaskDemoModule,
        PrimengRTLDemoModule,
        PrimengTerminalDemoModule,
        PrimengValidationDemoModule,

        PrimengButtonDemoModule,
        PrimengSplitbuttonDemoModule,

        PrimengInputTextDemoModule,
        PrimengInputTextAreaDemoModule,
        PrimengInputGroupDemoModule,
        PrimengCalendarDemoModule,
        PrimengChipsDemoModule,
        PrimengInputMaskDemoModule,
        PrimengInputSwitchDemoModule,
        PrimengPasswordIndicatorDemoModule,
        PrimengAutoCompleteDemoModule,
        PrimengSliderDemoModule,
        PrimengSpinnerDemoModule,
        PrimengRatingDemoModule,
        PrimengSelectDemoModule,
        PrimengSelectButtonDemoModule,
        PrimengListboxDemoModule,
        PrimengRadioButtonDemoModule,
        PrimengToggleButtonDemoModule,
        PrimengEditorDemoModule,
        PrimengColorPickerDemoModule,
        PrimengCheckboxDemoModule,

        PrimengGrowlDemoModule,
        PrimengMessagesDemoModule,
        PrimengGalleriaDemoModule,

        PrimengFileUploadDemoModule,

        PrimengAccordionDemoModule,
        PrimengPanelDemoModule,
        PrimengTabViewDemoModule,
        PrimengFieldsetDemoModule,
        PrimengToolbarDemoModule,
        PrimengGridDemoModule,

        PrimengBarchartDemoModule,
        PrimengDoughnutchartDemoModule,
        PrimengLinechartDemoModule,
        PrimengPiechartDemoModule,
        PrimengPolarareachartDemoModule,
        PrimengRadarchartDemoModule,

        PrimengDragDropDemoModule,

        PrimengDialogDemoModule,
        PrimengConfirmDialogDemoModule,
        PrimengLightboxDemoModule,
        PrimengTooltipDemoModule,
        PrimengOverlayPanelDemoModule,
        PrimengSideBarDemoModule,

        PrimengDataTableDemoModule,
        PrimengDataGridDemoModule,
        PrimengDataListDemoModule,
        PrimengDataScrollerDemoModule,
        PrimengScheduleDemoModule,
        PrimengOrderListDemoModule,
        PrimengPickListDemoModule,
        PrimengTreeDemoModule,
        PrimengTreeTableDemoModule,
        PrimengPaginatorDemoModule,
        PrimengOrgChartDemoModule,
        PrimengGmapDemoModule,
        PrimengCarouselDemoModule,
        PrimengProgressSpinnerDemoModule

    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PrimengprimengModule {}
