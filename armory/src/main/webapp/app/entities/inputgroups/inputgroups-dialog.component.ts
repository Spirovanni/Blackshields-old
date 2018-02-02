import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { Inputgroups } from './inputgroups.model';
import { InputgroupsPopupService } from './inputgroups-popup.service';
import { InputgroupsService } from './inputgroups.service';

@Component({
    selector: 'jhi-inputgroups-dialog',
    templateUrl: './inputgroups-dialog.component.html'
})
export class InputgroupsDialogComponent implements OnInit {

    inputgroups: Inputgroups;
    isSaving: boolean;
    dateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private inputgroupsService: InputgroupsService,
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
        this.dataUtils.clearInputImage(this.inputgroups, this.elementRef, field, fieldContentType, idInput);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.inputgroups.id !== undefined) {
            this.subscribeToSaveResponse(
                this.inputgroupsService.update(this.inputgroups));
        } else {
            this.subscribeToSaveResponse(
                this.inputgroupsService.create(this.inputgroups));
        }
    }

    private subscribeToSaveResponse(result: Observable<Inputgroups>) {
        result.subscribe((res: Inputgroups) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Inputgroups) {
        this.eventManager.broadcast({ name: 'inputgroupsListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-inputgroups-popup',
    template: ''
})
export class InputgroupsPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private inputgroupsPopupService: InputgroupsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.inputgroupsPopupService
                    .open(InputgroupsDialogComponent as Component, params['id']);
            } else {
                this.inputgroupsPopupService
                    .open(InputgroupsDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
