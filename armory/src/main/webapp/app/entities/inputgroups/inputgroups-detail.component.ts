import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { Inputgroups } from './inputgroups.model';
import { InputgroupsService } from './inputgroups.service';

@Component({
    selector: 'jhi-inputgroups-detail',
    templateUrl: './inputgroups-detail.component.html'
})
export class InputgroupsDetailComponent implements OnInit, OnDestroy {

    inputgroups: Inputgroups;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private inputgroupsService: InputgroupsService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInInputgroups();
    }

    load(id) {
        this.inputgroupsService.find(id).subscribe((inputgroups) => {
            this.inputgroups = inputgroups;
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

    registerChangeInInputgroups() {
        this.eventSubscriber = this.eventManager.subscribe(
            'inputgroupsListModification',
            (response) => this.load(this.inputgroups.id)
        );
    }
}
