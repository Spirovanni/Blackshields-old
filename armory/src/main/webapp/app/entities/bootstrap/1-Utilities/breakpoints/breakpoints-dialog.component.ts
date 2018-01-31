import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { Breakpoints } from './breakpoints.model';
import { BreakpointsPopupService } from './breakpoints-popup.service';
import { BreakpointsService } from './breakpoints.service';

@Component({
    selector: 'jhi-breakpoints-dialog',
    templateUrl: './breakpoints-dialog.component.html'
})
export class BreakpointsDialogComponent implements OnInit {

    breakpoints: Breakpoints;
    isSaving: boolean;
    dateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private breakpointsService: BreakpointsService,
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
        this.dataUtils.clearInputImage(this.breakpoints, this.elementRef, field, fieldContentType, idInput);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.breakpoints.id !== undefined) {
            this.subscribeToSaveResponse(
                this.breakpointsService.update(this.breakpoints));
        } else {
            this.subscribeToSaveResponse(
                this.breakpointsService.create(this.breakpoints));
        }
    }

    private subscribeToSaveResponse(result: Observable<Breakpoints>) {
        result.subscribe((res: Breakpoints) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Breakpoints) {
        this.eventManager.broadcast({ name: 'breakpointsListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-breakpoints-popup',
    template: ''
})
export class BreakpointsPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private breakpointsPopupService: BreakpointsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.breakpointsPopupService
                    .open(BreakpointsDialogComponent as Component, params['id']);
            } else {
                this.breakpointsPopupService
                    .open(BreakpointsDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
