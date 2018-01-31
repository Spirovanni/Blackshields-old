import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Buttons } from './buttons.model';
import { ButtonsPopupService } from './buttons-popup.service';
import { ButtonsService } from './buttons.service';

@Component({
    selector: 'jhi-buttons-delete-dialog',
    templateUrl: './buttons-delete-dialog.component.html'
})
export class ButtonsDeleteDialogComponent {

    buttons: Buttons;

    constructor(
        private buttonsService: ButtonsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.buttonsService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'buttonsListModification',
                content: 'Deleted an buttons'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-buttons-delete-popup',
    template: ''
})
export class ButtonsDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private buttonsPopupService: ButtonsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.buttonsPopupService
                .open(ButtonsDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
