import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { Colorsbackground } from './colorsbackground.model';
import { ColorsbackgroundPopupService } from './colorsbackground-popup.service';
import { ColorsbackgroundService } from './colorsbackground.service';

@Component({
    selector: 'jhi-colorsbackground-dialog',
    templateUrl: './colorsbackground-dialog.component.html'
})
export class ColorsbackgroundDialogComponent implements OnInit {

    colorsbackground: Colorsbackground;
    isSaving: boolean;
    dateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private colorsbackgroundService: ColorsbackgroundService,
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
        this.dataUtils.clearInputImage(this.colorsbackground, this.elementRef, field, fieldContentType, idInput);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.colorsbackground.id !== undefined) {
            this.subscribeToSaveResponse(
                this.colorsbackgroundService.update(this.colorsbackground));
        } else {
            this.subscribeToSaveResponse(
                this.colorsbackgroundService.create(this.colorsbackground));
        }
    }

    private subscribeToSaveResponse(result: Observable<Colorsbackground>) {
        result.subscribe((res: Colorsbackground) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Colorsbackground) {
        this.eventManager.broadcast({ name: 'colorsbackgroundListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-colorsbackground-popup',
    template: ''
})
export class ColorsbackgroundPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private colorsbackgroundPopupService: ColorsbackgroundPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.colorsbackgroundPopupService
                    .open(ColorsbackgroundDialogComponent as Component, params['id']);
            } else {
                this.colorsbackgroundPopupService
                    .open(ColorsbackgroundDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
