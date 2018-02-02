import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { GroupsbadgesComponent } from './groupsbadges.component';
import { GroupsbadgesDetailComponent } from './groupsbadges-detail.component';
import { GroupsbadgesPopupComponent } from './groupsbadges-dialog.component';
import { GroupsbadgesDeletePopupComponent } from './groupsbadges-delete-dialog.component';

@Injectable()
export class GroupsbadgesResolvePagingParams implements Resolve<any> {

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

export const groupsbadgesRoute: Routes = [
    {
        path: 'groupsbadges',
        component: GroupsbadgesComponent,
        resolve: {
            'pagingParams': GroupsbadgesResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'armoryApp.groupsbadges.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'groupsbadges/:id',
        component: GroupsbadgesDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'armoryApp.groupsbadges.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const groupsbadgesPopupRoute: Routes = [
    {
        path: 'groupsbadges-new',
        component: GroupsbadgesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'armoryApp.groupsbadges.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'groupsbadges/:id/edit',
        component: GroupsbadgesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'armoryApp.groupsbadges.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'groupsbadges/:id/delete',
        component: GroupsbadgesDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'armoryApp.groupsbadges.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
