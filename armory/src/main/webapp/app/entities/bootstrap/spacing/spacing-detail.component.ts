import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { Spacing } from './spacing.model';
import { SpacingService } from './spacing.service';

@Component({
    selector: 'jhi-spacing-detail',
    templateUrl: './spacing-detail.component.html'
})
export class SpacingDetailComponent implements OnInit, OnDestroy {

    spacing: Spacing;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private spacingService: SpacingService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSpacings();
    }

    load(id) {
        this.spacingService.find(id).subscribe((spacing) => {
            this.spacing = spacing;
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

    registerChangeInSpacings() {
        this.eventSubscriber = this.eventManager.subscribe(
            'spacingListModification',
            (response) => this.load(this.spacing.id)
        );
    }
}
