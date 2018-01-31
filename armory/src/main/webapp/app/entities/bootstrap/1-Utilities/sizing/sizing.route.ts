import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../../shared/index';
import { SizingComponent } from './sizing.component';
import { SizingDetailComponent } from './sizing-detail.component';
import { SizingPopupComponent } from './sizing-dialog.component';
import { SizingDeletePopupComponent } from './sizing-delete-dialog.component';

@Injectable()
export class SizingResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const sizingRoute: Routes = [
    {
        path: 'sizing',
        component: SizingComponent,
        resolve: {
            'pagingParams': SizingResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'armoryApp.sizing.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'sizing/:id',
        component: SizingDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'armoryApp.sizing.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const sizingPopupRoute: Routes = [
    {
        path: 'sizing-new',
        component: SizingPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'armoryApp.sizing.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'sizing/:id/edit',
        component: SizingPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'armoryApp.sizing.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'sizing/:id/delete',
        component: SizingDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'armoryApp.sizing.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
