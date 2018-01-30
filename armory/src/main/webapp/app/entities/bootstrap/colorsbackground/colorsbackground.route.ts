import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../../shared/index';
import { ColorsbackgroundComponent } from './colorsbackground.component';
import { ColorsbackgroundDetailComponent } from './colorsbackground-detail.component';
import { ColorsbackgroundPopupComponent } from './colorsbackground-dialog.component';
import { ColorsbackgroundDeletePopupComponent } from './colorsbackground-delete-dialog.component';

@Injectable()
export class ColorsbackgroundResolvePagingParams implements Resolve<any> {

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

export const colorsbackgroundRoute: Routes = [
    {
        path: 'colorsbackground',
        component: ColorsbackgroundComponent,
        resolve: {
            'pagingParams': ColorsbackgroundResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'armoryApp.colorsbackground.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'colorsbackground/:id',
        component: ColorsbackgroundDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'armoryApp.colorsbackground.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const colorsbackgroundPopupRoute: Routes = [
    {
        path: 'colorsbackground-new',
        component: ColorsbackgroundPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'armoryApp.colorsbackground.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'colorsbackground/:id/edit',
        component: ColorsbackgroundPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'armoryApp.colorsbackground.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'colorsbackground/:id/delete',
        component: ColorsbackgroundDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'armoryApp.colorsbackground.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
