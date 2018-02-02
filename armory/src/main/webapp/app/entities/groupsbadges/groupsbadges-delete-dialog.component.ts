import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Groupsbadges } from './groupsbadges.model';
import { GroupsbadgesPopupService } from './groupsbadges-popup.service';
import { GroupsbadgesService } from './groupsbadges.service';

@Component({
    selector: 'jhi-groupsbadges-delete-dialog',
    templateUrl: './groupsbadges-delete-dialog.component.html'
})
export class GroupsbadgesDeleteDialogComponent {

    groupsbadges: Groupsbadges;

    constructor(
        private groupsbadgesService: GroupsbadgesService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.groupsbadgesService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'groupsbadgesListModification',
                content: 'Deleted an groupsbadges'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-groupsbadges-delete-popup',
    template: ''
})
export class GroupsbadgesDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private groupsbadgesPopupService: GroupsbadgesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.groupsbadgesPopupService
                .open(GroupsbadgesDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
