import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { Spacing } from './spacing.model';
import { SpacingPopupService } from './spacing-popup.service';
import { SpacingService } from './spacing.service';

@Component({
    selector: 'jhi-spacing-dialog',
    templateUrl: './spacing-dialog.component.html'
})
export class SpacingDialogComponent implements OnInit {

    spacing: Spacing;
    isSaving: boolean;
    dateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private spacingService: SpacingService,
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
        this.dataUtils.clearInputImage(this.spacing, this.elementRef, field, fieldContentType, idInput);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.spacing.id !== undefined) {
            this.subscribeToSaveResponse(
                this.spacingService.update(this.spacing));
        } else {
            this.subscribeToSaveResponse(
                this.spacingService.create(this.spacing));
        }
    }

    private subscribeToSaveResponse(result: Observable<Spacing>) {
        result.subscribe((res: Spacing) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Spacing) {
        this.eventManager.broadcast({ name: 'spacingListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-spacing-popup',
    template: ''
})
export class SpacingPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private spacingPopupService: SpacingPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.spacingPopupService
                    .open(SpacingDialogComponent as Component, params['id']);
            } else {
                this.spacingPopupService
                    .open(SpacingDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
