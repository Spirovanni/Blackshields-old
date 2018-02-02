import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { FormsComponent } from './forms.component';
import { FormsDetailComponent } from './forms-detail.component';
import { FormsPopupComponent } from './forms-dialog.component';
import { FormsDeletePopupComponent } from './forms-delete-dialog.component';

@Injectable()
export class FormsResolvePagingParams implements Resolve<any> {

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

export const formsRoute: Routes = [
    {
        path: 'forms',
        component: FormsComponent,
        resolve: {
            'pagingParams': FormsResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'armoryApp.forms.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'forms/:id',
        component: FormsDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'armoryApp.forms.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const formsPopupRoute: Routes = [
    {
        path: 'forms-new',
        component: FormsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'armoryApp.forms.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'forms/:id/edit',
        component: FormsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'armoryApp.forms.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'forms/:id/delete',
        component: FormsDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'armoryApp.forms.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
