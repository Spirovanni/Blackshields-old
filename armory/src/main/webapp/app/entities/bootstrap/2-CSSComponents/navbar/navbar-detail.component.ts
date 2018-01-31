import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { Navbar } from './navbar.model';
import { NavbarService } from './navbar.service';

@Component({
    selector: 'jhi-navbar-detail',
    templateUrl: './navbar-detail.component.html'
})
export class NavbarDetailComponent implements OnInit, OnDestroy {

    navbar: Navbar;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private navbarService: NavbarService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInNavbars();
    }

    load(id) {
        this.navbarService.find(id).subscribe((navbar) => {
            this.navbar = navbar;
        });
    }
    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInNavbars() {
        this.eventSubscriber = this.eventManager.subscribe(
            'navbarListModification',
            (response) => this.load(this.navbar.id)
        );
    }
}
