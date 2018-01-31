import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Colorsbackground } from './colorsbackground.model';
import { ColorsbackgroundPopupService } from './colorsbackground-popup.service';
import { ColorsbackgroundService } from './colorsbackground.service';

@Component({
    selector: 'jhi-colorsbackground-delete-dialog',
    templateUrl: './colorsbackground-delete-dialog.component.html'
})
export class ColorsbackgroundDeleteDialogComponent {

    colorsbackground: Colorsbackground;

    constructor(
        private colorsbackgroundService: ColorsbackgroundService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.colorsbackgroundService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'colorsbackgroundListModification',
                content: 'Deleted an colorsbackground'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-colorsbackground-delete-popup',
    template: ''
})
export class ColorsbackgroundDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private colorsbackgroundPopupService: ColorsbackgroundPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.colorsbackgroundPopupService
                .open(ColorsbackgroundDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
