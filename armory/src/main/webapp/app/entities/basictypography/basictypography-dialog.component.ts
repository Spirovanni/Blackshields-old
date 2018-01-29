import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { Basictypography } from './basictypography.model';
import { BasictypographyPopupService } from './basictypography-popup.service';
import { BasictypographyService } from './basictypography.service';

@Component({
    selector: 'jhi-basictypography-dialog',
    templateUrl: './basictypography-dialog.component.html'
})
export class BasictypographyDialogComponent implements OnInit {

    basictypography: Basictypography;
    isSaving: boolean;
    dateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private basictypographyService: BasictypographyService,
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
        this.dataUtils.clearInputImage(this.basictypography, this.elementRef, field, fieldContentType, idInput);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.basictypography.id !== undefined) {
            this.subscribeToSaveResponse(
                this.basictypographyService.update(this.basictypography));
        } else {
            this.subscribeToSaveResponse(
                this.basictypographyService.create(this.basictypography));
        }
    }

    private subscribeToSaveResponse(result: Observable<Basictypography>) {
        result.subscribe((res: Basictypography) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Basictypography) {
        this.eventManager.broadcast({ name: 'basictypographyListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-basictypography-popup',
    template: ''
})
export class BasictypographyPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private basictypographyPopupService: BasictypographyPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.basictypographyPopupService
                    .open(BasictypographyDialogComponent as Component, params['id']);
            } else {
                this.basictypographyPopupService
                    .open(BasictypographyDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
