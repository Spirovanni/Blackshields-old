import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { Floatsposition } from './floatsposition.model';
import { FloatspositionPopupService } from './floatsposition-popup.service';
import { FloatspositionService } from './floatsposition.service';

@Component({
    selector: 'jhi-floatsposition-dialog',
    templateUrl: './floatsposition-dialog.component.html'
})
export class FloatspositionDialogComponent implements OnInit {

    floatsposition: Floatsposition;
    isSaving: boolean;
    dateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private floatspositionService: FloatspositionService,
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
        this.dataUtils.clearInputImage(this.floatsposition, this.elementRef, field, fieldContentType, idInput);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.floatsposition.id !== undefined) {
            this.subscribeToSaveResponse(
                this.floatspositionService.update(this.floatsposition));
        } else {
            this.subscribeToSaveResponse(
                this.floatspositionService.create(this.floatsposition));
        }
    }

    private subscribeToSaveResponse(result: Observable<Floatsposition>) {
        result.subscribe((res: Floatsposition) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Floatsposition) {
        this.eventManager.broadcast({ name: 'floatspositionListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-floatsposition-popup',
    template: ''
})
export class FloatspositionPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private floatspositionPopupService: FloatspositionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.floatspositionPopupService
                    .open(FloatspositionDialogComponent as Component, params['id']);
            } else {
                this.floatspositionPopupService
                    .open(FloatspositionDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
