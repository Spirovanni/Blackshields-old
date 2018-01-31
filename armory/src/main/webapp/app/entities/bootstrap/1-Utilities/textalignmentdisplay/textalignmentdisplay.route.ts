import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../../shared/index';
import { TextalignmentdisplayComponent } from './textalignmentdisplay.component';
import { TextalignmentdisplayDetailComponent } from './textalignmentdisplay-detail.component';
import { TextalignmentdisplayPopupComponent } from './textalignmentdisplay-dialog.component';
import { TextalignmentdisplayDeletePopupComponent } from './textalignmentdisplay-delete-dialog.component';

@Injectable()
export class TextalignmentdisplayResolvePagingParams implements Resolve<any> {

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

export const textalignmentdisplayRoute: Routes = [
    {
        path: 'textalignmentdisplay',
        component: TextalignmentdisplayComponent,
        resolve: {
            'pagingParams': TextalignmentdisplayResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'armoryApp.textalignmentdisplay.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'textalignmentdisplay/:id',
        component: TextalignmentdisplayDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'armoryApp.textalignmentdisplay.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const textalignmentdisplayPopupRoute: Routes = [
    {
        path: 'textalignmentdisplay-new',
        component: TextalignmentdisplayPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'armoryApp.textalignmentdisplay.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'textalignmentdisplay/:id/edit',
        component: TextalignmentdisplayPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'armoryApp.textalignmentdisplay.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'textalignmentdisplay/:id/delete',
        component: TextalignmentdisplayDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'armoryApp.textalignmentdisplay.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
