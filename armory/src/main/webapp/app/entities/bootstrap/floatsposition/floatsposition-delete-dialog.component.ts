import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Floatsposition } from './floatsposition.model';
import { FloatspositionPopupService } from './floatsposition-popup.service';
import { FloatspositionService } from './floatsposition.service';

@Component({
    selector: 'jhi-floatsposition-delete-dialog',
    templateUrl: './floatsposition-delete-dialog.component.html'
})
export class FloatspositionDeleteDialogComponent {

    floatsposition: Floatsposition;

    constructor(
        private floatspositionService: FloatspositionService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.floatspositionService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'floatspositionListModification',
                content: 'Deleted an floatsposition'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-floatsposition-delete-popup',
    template: ''
})
export class FloatspositionDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private floatspositionPopupService: FloatspositionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.floatspositionPopupService
                .open(FloatspositionDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
