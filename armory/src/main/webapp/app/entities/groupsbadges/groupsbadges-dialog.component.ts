import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { Groupsbadges } from './groupsbadges.model';
import { GroupsbadgesPopupService } from './groupsbadges-popup.service';
import { GroupsbadgesService } from './groupsbadges.service';

@Component({
    selector: 'jhi-groupsbadges-dialog',
    templateUrl: './groupsbadges-dialog.component.html'
})
export class GroupsbadgesDialogComponent implements OnInit {

    groupsbadges: Groupsbadges;
    isSaving: boolean;
    dateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private groupsbadgesService: GroupsbadgesService,
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
        this.dataUtils.clearInputImage(this.groupsbadges, this.elementRef, field, fieldContentType, idInput);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.groupsbadges.id !== undefined) {
            this.subscribeToSaveResponse(
                this.groupsbadgesService.update(this.groupsbadges));
        } else {
            this.subscribeToSaveResponse(
                this.groupsbadgesService.create(this.groupsbadges));
        }
    }

    private subscribeToSaveResponse(result: Observable<Groupsbadges>) {
        result.subscribe((res: Groupsbadges) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Groupsbadges) {
        this.eventManager.broadcast({ name: 'groupsbadgesListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-groupsbadges-popup',
    template: ''
})
export class GroupsbadgesPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private groupsbadgesPopupService: GroupsbadgesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.groupsbadgesPopupService
                    .open(GroupsbadgesDialogComponent as Component, params['id']);
            } else {
                this.groupsbadgesPopupService
                    .open(GroupsbadgesDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
