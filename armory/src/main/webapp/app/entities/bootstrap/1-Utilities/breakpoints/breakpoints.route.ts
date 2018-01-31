import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../../shared/index';
import { BreakpointsComponent } from './breakpoints.component';
import { BreakpointsDetailComponent } from './breakpoints-detail.component';
import { BreakpointsPopupComponent } from './breakpoints-dialog.component';
import { BreakpointsDeletePopupComponent } from './breakpoints-delete-dialog.component';

@Injectable()
export class BreakpointsResolvePagingParams implements Resolve<any> {

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

export const breakpointsRoute: Routes = [
    {
        path: 'breakpoints',
        component: BreakpointsComponent,
        resolve: {
            'pagingParams': BreakpointsResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'armoryApp.breakpoints.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'breakpoints/:id',
        component: BreakpointsDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'armoryApp.breakpoints.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const breakpointsPopupRoute: Routes = [
    {
        path: 'breakpoints-new',
        component: BreakpointsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'armoryApp.breakpoints.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'breakpoints/:id/edit',
        component: BreakpointsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'armoryApp.breakpoints.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'breakpoints/:id/delete',
        component: BreakpointsDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'armoryApp.breakpoints.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
