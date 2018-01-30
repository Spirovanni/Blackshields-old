import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Sizing } from './sizing.model';
import { SizingPopupService } from './sizing-popup.service';
import { SizingService } from './sizing.service';

@Component({
    selector: 'jhi-sizing-delete-dialog',
    templateUrl: './sizing-delete-dialog.component.html'
})
export class SizingDeleteDialogComponent {

    sizing: Sizing;

    constructor(
        private sizingService: SizingService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.sizingService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'sizingListModification',
                content: 'Deleted an sizing'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-sizing-delete-popup',
    template: ''
})
export class SizingDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private sizingPopupService: SizingPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.sizingPopupService
                .open(SizingDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
