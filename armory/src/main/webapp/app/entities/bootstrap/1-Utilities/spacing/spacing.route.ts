import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../../shared/index';
import { SpacingComponent } from './spacing.component';
import { SpacingDetailComponent } from './spacing-detail.component';
import { SpacingPopupComponent } from './spacing-dialog.component';
import { SpacingDeletePopupComponent } from './spacing-delete-dialog.component';

@Injectable()
export class SpacingResolvePagingParams implements Resolve<any> {

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

export const spacingRoute: Routes = [
    {
        path: 'spacing',
        component: SpacingComponent,
        resolve: {
            'pagingParams': SpacingResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'armoryApp.spacing.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'spacing/:id',
        component: SpacingDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'armoryApp.spacing.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const spacingPopupRoute: Routes = [
    {
        path: 'spacing-new',
        component: SpacingPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'armoryApp.spacing.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'spacing/:id/edit',
        component: SpacingPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'armoryApp.spacing.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'spacing/:id/delete',
        component: SpacingDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'armoryApp.spacing.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
