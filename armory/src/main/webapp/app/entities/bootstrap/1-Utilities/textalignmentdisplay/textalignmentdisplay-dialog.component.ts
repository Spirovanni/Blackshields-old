import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { Textalignmentdisplay } from './textalignmentdisplay.model';
import { TextalignmentdisplayPopupService } from './textalignmentdisplay-popup.service';
import { TextalignmentdisplayService } from './textalignmentdisplay.service';

@Component({
    selector: 'jhi-textalignmentdisplay-dialog',
    templateUrl: './textalignmentdisplay-dialog.component.html'
})
export class TextalignmentdisplayDialogComponent implements OnInit {

    textalignmentdisplay: Textalignmentdisplay;
    isSaving: boolean;
    dateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private textalignmentdisplayService: TextalignmentdisplayService,
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
        this.dataUtils.clearInputImage(this.textalignmentdisplay, this.elementRef, field, fieldContentType, idInput);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.textalignmentdisplay.id !== undefined) {
            this.subscribeToSaveResponse(
                this.textalignmentdisplayService.update(this.textalignmentdisplay));
        } else {
            this.subscribeToSaveResponse(
                this.textalignmentdisplayService.create(this.textalignmentdisplay));
        }
    }

    private subscribeToSaveResponse(result: Observable<Textalignmentdisplay>) {
        result.subscribe((res: Textalignmentdisplay) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Textalignmentdisplay) {
        this.eventManager.broadcast({ name: 'textalignmentdisplayListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-textalignmentdisplay-popup',
    template: ''
})
export class TextalignmentdisplayPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private textalignmentdisplayPopupService: TextalignmentdisplayPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.textalignmentdisplayPopupService
                    .open(TextalignmentdisplayDialogComponent as Component, params['id']);
            } else {
                this.textalignmentdisplayPopupService
                    .open(TextalignmentdisplayDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
