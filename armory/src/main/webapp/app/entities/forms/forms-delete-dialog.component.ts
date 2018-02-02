import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Forms } from './forms.model';
import { FormsPopupService } from './forms-popup.service';
import { FormsService } from './forms.service';

@Component({
    selector: 'jhi-forms-delete-dialog',
    templateUrl: './forms-delete-dialog.component.html'
})
export class FormsDeleteDialogComponent {

    forms: Forms;

    constructor(
        private formsService: FormsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.formsService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'formsListModification',
                content: 'Deleted an forms'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-forms-delete-popup',
    template: ''
})
export class FormsDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private formsPopupService: FormsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.formsPopupService
                .open(FormsDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
