import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Breakpoints } from './breakpoints.model';
import { BreakpointsPopupService } from './breakpoints-popup.service';
import { BreakpointsService } from './breakpoints.service';

@Component({
    selector: 'jhi-breakpoints-delete-dialog',
    templateUrl: './breakpoints-delete-dialog.component.html'
})
export class BreakpointsDeleteDialogComponent {

    breakpoints: Breakpoints;

    constructor(
        private breakpointsService: BreakpointsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.breakpointsService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'breakpointsListModification',
                content: 'Deleted an breakpoints'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-breakpoints-delete-popup',
    template: ''
})
export class BreakpointsDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private breakpointsPopupService: BreakpointsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.breakpointsPopupService
                .open(BreakpointsDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
