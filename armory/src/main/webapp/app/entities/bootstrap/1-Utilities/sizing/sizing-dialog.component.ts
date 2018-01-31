import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { Sizing } from './sizing.model';
import { SizingPopupService } from './sizing-popup.service';
import { SizingService } from './sizing.service';

@Component({
    selector: 'jhi-sizing-dialog',
    templateUrl: './sizing-dialog.component.html'
})
export class SizingDialogComponent implements OnInit {

    sizing: Sizing;
    isSaving: boolean;
    dateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private sizingService: SizingService,
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
        this.dataUtils.clearInputImage(this.sizing, this.elementRef, field, fieldContentType, idInput);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.sizing.id !== undefined) {
            this.subscribeToSaveResponse(
                this.sizingService.update(this.sizing));
        } else {
            this.subscribeToSaveResponse(
                this.sizingService.create(this.sizing));
        }
    }

    private subscribeToSaveResponse(result: Observable<Sizing>) {
        result.subscribe((res: Sizing) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Sizing) {
        this.eventManager.broadcast({ name: 'sizingListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-sizing-popup',
    template: ''
})
export class SizingPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private sizingPopupService: SizingPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.sizingPopupService
                    .open(SizingDialogComponent as Component, params['id']);
            } else {
                this.sizingPopupService
                    .open(SizingDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
