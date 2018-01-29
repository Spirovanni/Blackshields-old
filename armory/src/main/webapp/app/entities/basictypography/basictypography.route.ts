import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { BasictypographyComponent } from './basictypography.component';
import { BasictypographyDetailComponent } from './basictypography-detail.component';
import { BasictypographyPopupComponent } from './basictypography-dialog.component';
import { BasictypographyDeletePopupComponent } from './basictypography-delete-dialog.component';

@Injectable()
export class BasictypographyResolvePagingParams implements Resolve<any> {

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

export const basictypographyRoute: Routes = [
    {
        path: 'basictypography',
        component: BasictypographyComponent,
        resolve: {
            'pagingParams': BasictypographyResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'armoryApp.basictypography.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'basictypography/:id',
        component: BasictypographyDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'armoryApp.basictypography.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const basictypographyPopupRoute: Routes = [
    {
        path: 'basictypography-new',
        component: BasictypographyPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'armoryApp.basictypography.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'basictypography/:id/edit',
        component: BasictypographyPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'armoryApp.basictypography.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'basictypography/:id/delete',
        component: BasictypographyDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'armoryApp.basictypography.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
