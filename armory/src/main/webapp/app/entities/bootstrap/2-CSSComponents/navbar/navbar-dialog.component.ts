import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { Navbar } from './navbar.model';
import { NavbarPopupService } from './navbar-popup.service';
import { NavbarService } from './navbar.service';

@Component({
    selector: 'jhi-navbar-dialog',
    templateUrl: './navbar-dialog.component.html'
})
export class NavbarDialogComponent implements OnInit {

    navbar: Navbar;
    isSaving: boolean;
    dateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private navbarService: NavbarService,
        private elementRef: ElementRef,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clearInputImage(field: string, fieldContentType: string, idInput: string) {
        this.dataUtils.clearInputImage(this.navbar, this.elementRef, field, fieldContentType, idInput);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.navbar.id !== undefined) {
            this.subscribeToSaveResponse(
                this.navbarService.update(this.navbar));
        } else {
            this.subscribeToSaveResponse(
                this.navbarService.create(this.navbar));
        }
    }

    private subscribeToSaveResponse(result: Observable<Navbar>) {
        result.subscribe((res: Navbar) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Navbar) {
        this.eventManager.broadcast({ name: 'navbarListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-navbar-popup',
    template: ''
})
export class NavbarPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private navbarPopupService: NavbarPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.navbarPopupService
                    .open(NavbarDialogComponent as Component, params['id']);
            } else {
                this.navbarPopupService
                    .open(NavbarDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
