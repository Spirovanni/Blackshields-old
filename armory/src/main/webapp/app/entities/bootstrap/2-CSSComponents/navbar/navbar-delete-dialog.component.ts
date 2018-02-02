import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Navbar } from './navbar.model';
import { NavbarPopupService } from './navbar-popup.service';
import { NavbarService } from './navbar.service';

@Component({
    selector: 'jhi-navbar-delete-dialog',
    templateUrl: './navbar-delete-dialog.component.html'
})
export class NavbarDeleteDialogComponent {

    navbar: Navbar;

    constructor(
        private navbarService: NavbarService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.navbarService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'navbarListModification',
                content: 'Deleted an navbar'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-navbar-delete-popup',
    template: ''
})
export class NavbarDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private navbarPopupService: NavbarPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.navbarPopupService
                .open(NavbarDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
