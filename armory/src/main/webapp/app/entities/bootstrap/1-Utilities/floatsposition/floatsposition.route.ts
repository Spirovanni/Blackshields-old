import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../../../shared/index';
import { FloatspositionComponent } from './floatsposition.component';
import { FloatspositionDetailComponent } from './floatsposition-detail.component';
import { FloatspositionPopupComponent } from './floatsposition-dialog.component';
import { FloatspositionDeletePopupComponent } from './floatsposition-delete-dialog.component';

@Injectable()
export class FloatspositionResolvePagingParams implements Resolve<any> {

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

export const floatspositionRoute: Routes = [
    {
        path: 'floatsposition',
        component: FloatspositionComponent,
        resolve: {
            'pagingParams': FloatspositionResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'armoryApp.floatsposition.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'floatsposition/:id',
        component: FloatspositionDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'armoryApp.floatsposition.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const floatspositionPopupRoute: Routes = [
    {
        path: 'floatsposition-new',
        component: FloatspositionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'armoryApp.floatsposition.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'floatsposition/:id/edit',
        component: FloatspositionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'armoryApp.floatsposition.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'floatsposition/:id/delete',
        component: FloatspositionDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'armoryApp.floatsposition.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
