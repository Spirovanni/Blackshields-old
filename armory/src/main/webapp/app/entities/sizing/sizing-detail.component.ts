import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { Sizing } from './sizing.model';
import { SizingService } from './sizing.service';

@Component({
    selector: 'jhi-sizing-detail',
    templateUrl: './sizing-detail.component.html'
})
export class SizingDetailComponent implements OnInit, OnDestroy {

    sizing: Sizing;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private sizingService: SizingService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSizings();
    }

    load(id) {
        this.sizingService.find(id).subscribe((sizing) => {
            this.sizing = sizing;
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

    registerChangeInSizings() {
        this.eventSubscriber = this.eventManager.subscribe(
            'sizingListModification',
            (response) => this.load(this.sizing.id)
        );
    }
}
