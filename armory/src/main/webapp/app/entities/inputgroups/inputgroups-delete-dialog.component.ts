import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Inputgroups } from './inputgroups.model';
import { InputgroupsPopupService } from './inputgroups-popup.service';
import { InputgroupsService } from './inputgroups.service';

@Component({
    selector: 'jhi-inputgroups-delete-dialog',
    templateUrl: './inputgroups-delete-dialog.component.html'
})
export class InputgroupsDeleteDialogComponent {

    inputgroups: Inputgroups;

    constructor(
        private inputgroupsService: InputgroupsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.inputgroupsService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'inputgroupsListModification',
                content: 'Deleted an inputgroups'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-inputgroups-delete-popup',
    template: ''
})
export class InputgroupsDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private inputgroupsPopupService: InputgroupsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.inputgroupsPopupService
                .open(InputgroupsDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
