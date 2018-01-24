import './vendor.ts';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2Webstorage } from 'ngx-webstorage';

import { PrimengSharedModule, UserRouteAccessService } from './shared';
import { PrimengAppRoutingModule} from './app-routing.module';
import { PrimengHomeModule } from './home/home.module';
import { PrimengAdminModule } from './admin/admin.module';
import { PrimengAccountModule } from './account/account.module';
import { PrimengEntityModule } from './entities/entity.module';
import { customHttpProvider } from './blocks/interceptor/http.provider';
import { PaginationConfig } from './blocks/config/uib-pagination.config';

import { PrimengprimengModule } from './primeng/primeng.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here

import {
    JhiMainComponent,
    NavbarComponent,
    FooterComponent,
    ProfileService,
    PageRibbonComponent,
    ActiveMenuDirective,
    ErrorComponent
} from './layouts';

@NgModule({
    imports: [
        BrowserModule,
        PrimengAppRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-'}),
        PrimengSharedModule,
        PrimengHomeModule,
        PrimengAdminModule,
        PrimengAccountModule,
        PrimengEntityModule,
        PrimengprimengModule,
        // jhipster-needle-angular-add-module JHipster will add new module here
    ],
    declarations: [
        JhiMainComponent,
        NavbarComponent,
        ErrorComponent,
        PageRibbonComponent,
        ActiveMenuDirective,
        FooterComponent
    ],
    providers: [
        ProfileService,
        customHttpProvider(),
        PaginationConfig,
        UserRouteAccessService
    ],
    bootstrap: [ JhiMainComponent ]
})
export class PrimengAppModule {}
