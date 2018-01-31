import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../../../shared/index';
import { NavbarComponent } from './navbar.component';
import { NavbarDetailComponent } from './navbar-detail.component';
import { NavbarPopupComponent } from './navbar-dialog.component';
import { NavbarDeletePopupComponent } from './navbar-delete-dialog.component';

@Injectable()
export class NavbarResolvePagingParams implements Resolve<any> {

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

export const navbarRoute: Routes = [
    {
        path: 'navbar',
        component: NavbarComponent,
        resolve: {
            'pagingParams': NavbarResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'armoryApp.navbar.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'navbar/:id',
        component: NavbarDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'armoryApp.navbar.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const navbarPopupRoute: Routes = [
    {
        path: 'navbar-new',
        component: NavbarPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'armoryApp.navbar.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'navbar/:id/edit',
        component: NavbarPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'armoryApp.navbar.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'navbar/:id/delete',
        component: NavbarDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'armoryApp.navbar.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
