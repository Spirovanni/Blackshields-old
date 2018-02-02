import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { InputgroupsComponent } from './inputgroups.component';
import { InputgroupsDetailComponent } from './inputgroups-detail.component';
import { InputgroupsPopupComponent } from './inputgroups-dialog.component';
import { InputgroupsDeletePopupComponent } from './inputgroups-delete-dialog.component';

@Injectable()
export class InputgroupsResolvePagingParams implements Resolve<any> {

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

export const inputgroupsRoute: Routes = [
    {
        path: 'inputgroups',
        component: InputgroupsComponent,
        resolve: {
            'pagingParams': InputgroupsResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'armoryApp.inputgroups.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'inputgroups/:id',
        component: InputgroupsDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'armoryApp.inputgroups.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const inputgroupsPopupRoute: Routes = [
    {
        path: 'inputgroups-new',
        component: InputgroupsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'armoryApp.inputgroups.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'inputgroups/:id/edit',
        component: InputgroupsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'armoryApp.inputgroups.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'inputgroups/:id/delete',
        component: InputgroupsDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'armoryApp.inputgroups.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
