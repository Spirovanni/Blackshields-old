import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { Buttons } from './buttons.model';
import { ButtonsPopupService } from './buttons-popup.service';
import { ButtonsService } from './buttons.service';

@Component({
    selector: 'jhi-buttons-dialog',
    templateUrl: './buttons-dialog.component.html'
})
export class ButtonsDialogComponent implements OnInit {

    buttons: Buttons;
    isSaving: boolean;
    dateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private buttonsService: ButtonsService,
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
        this.dataUtils.clearInputImage(this.buttons, this.elementRef, field, fieldContentType, idInput);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.buttons.id !== undefined) {
            this.subscribeToSaveResponse(
                this.buttonsService.update(this.buttons));
        } else {
            this.subscribeToSaveResponse(
                this.buttonsService.create(this.buttons));
        }
    }

    private subscribeToSaveResponse(result: Observable<Buttons>) {
        result.subscribe((res: Buttons) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Buttons) {
        this.eventManager.broadcast({ name: 'buttonsListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-buttons-popup',
    template: ''
})
export class ButtonsPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private buttonsPopupService: ButtonsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.buttonsPopupService
                    .open(ButtonsDialogComponent as Component, params['id']);
            } else {
                this.buttonsPopupService
                    .open(ButtonsDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
