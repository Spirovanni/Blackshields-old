import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Spacing } from './spacing.model';
import { SpacingPopupService } from './spacing-popup.service';
import { SpacingService } from './spacing.service';

@Component({
    selector: 'jhi-spacing-delete-dialog',
    templateUrl: './spacing-delete-dialog.component.html'
})
export class SpacingDeleteDialogComponent {

    spacing: Spacing;

    constructor(
        private spacingService: SpacingService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.spacingService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'spacingListModification',
                content: 'Deleted an spacing'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-spacing-delete-popup',
    template: ''
})
export class SpacingDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private spacingPopupService: SpacingPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.spacingPopupService
                .open(SpacingDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
