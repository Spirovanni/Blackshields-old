import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { Groupsbadges } from './groupsbadges.model';
import { GroupsbadgesService } from './groupsbadges.service';

@Component({
    selector: 'jhi-groupsbadges-detail',
    templateUrl: './groupsbadges-detail.component.html'
})
export class GroupsbadgesDetailComponent implements OnInit, OnDestroy {

    groupsbadges: Groupsbadges;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private groupsbadgesService: GroupsbadgesService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInGroupsbadges();
    }

    load(id) {
        this.groupsbadgesService.find(id).subscribe((groupsbadges) => {
            this.groupsbadges = groupsbadges;
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

    registerChangeInGroupsbadges() {
        this.eventSubscriber = this.eventManager.subscribe(
            'groupsbadgesListModification',
            (response) => this.load(this.groupsbadges.id)
        );
    }
}
