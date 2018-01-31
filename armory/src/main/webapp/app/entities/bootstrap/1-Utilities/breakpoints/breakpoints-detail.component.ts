import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { Breakpoints } from './breakpoints.model';
import { BreakpointsService } from './breakpoints.service';

@Component({
    selector: 'jhi-breakpoints-detail',
    templateUrl: './breakpoints-detail.component.html'
})
export class BreakpointsDetailComponent implements OnInit, OnDestroy {

    breakpoints: Breakpoints;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private breakpointsService: BreakpointsService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInBreakpoints();
    }

    load(id) {
        this.breakpointsService.find(id).subscribe((breakpoints) => {
            this.breakpoints = breakpoints;
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

    registerChangeInBreakpoints() {
        this.eventSubscriber = this.eventManager.subscribe(
            'breakpointsListModification',
            (response) => this.load(this.breakpoints.id)
        );
    }
}
