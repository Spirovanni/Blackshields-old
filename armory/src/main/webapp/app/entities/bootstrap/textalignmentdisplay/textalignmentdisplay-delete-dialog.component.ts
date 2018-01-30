import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Textalignmentdisplay } from './textalignmentdisplay.model';
import { TextalignmentdisplayPopupService } from './textalignmentdisplay-popup.service';
import { TextalignmentdisplayService } from './textalignmentdisplay.service';

@Component({
    selector: 'jhi-textalignmentdisplay-delete-dialog',
    templateUrl: './textalignmentdisplay-delete-dialog.component.html'
})
export class TextalignmentdisplayDeleteDialogComponent {

    textalignmentdisplay: Textalignmentdisplay;

    constructor(
        private textalignmentdisplayService: TextalignmentdisplayService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.textalignmentdisplayService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'textalignmentdisplayListModification',
                content: 'Deleted an textalignmentdisplay'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-textalignmentdisplay-delete-popup',
    template: ''
})
export class TextalignmentdisplayDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private textalignmentdisplayPopupService: TextalignmentdisplayPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.textalignmentdisplayPopupService
                .open(TextalignmentdisplayDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
