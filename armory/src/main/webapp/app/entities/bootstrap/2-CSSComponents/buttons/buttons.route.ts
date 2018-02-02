import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../../../shared/index';
import { ButtonsComponent } from './buttons.component';
import { ButtonsDetailComponent } from './buttons-detail.component';
import { ButtonsPopupComponent } from './buttons-dialog.component';
import { ButtonsDeletePopupComponent } from './buttons-delete-dialog.component';

@Injectable()
export class ButtonsResolvePagingParams implements Resolve<any> {

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

export const buttonsRoute: Routes = [
    {
        path: 'buttons',
        component: ButtonsComponent,
        resolve: {
            'pagingParams': ButtonsResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'armoryApp.buttons.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'buttons/:id',
        component: ButtonsDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'armoryApp.buttons.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const buttonsPopupRoute: Routes = [
    {
        path: 'buttons-new',
        component: ButtonsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'armoryApp.buttons.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'buttons/:id/edit',
        component: ButtonsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'armoryApp.buttons.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'buttons/:id/delete',
        component: ButtonsDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'armoryApp.buttons.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
