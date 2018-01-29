import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Basictypography } from './basictypography.model';
import { BasictypographyPopupService } from './basictypography-popup.service';
import { BasictypographyService } from './basictypography.service';

@Component({
    selector: 'jhi-basictypography-delete-dialog',
    templateUrl: './basictypography-delete-dialog.component.html'
})
export class BasictypographyDeleteDialogComponent {

    basictypography: Basictypography;

    constructor(
        private basictypographyService: BasictypographyService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.basictypographyService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'basictypographyListModification',
                content: 'Deleted an basictypography'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-basictypography-delete-popup',
    template: ''
})
export class BasictypographyDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private basictypographyPopupService: BasictypographyPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.basictypographyPopupService
                .open(BasictypographyDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
