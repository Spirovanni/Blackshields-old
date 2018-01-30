import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { Floatsposition } from './floatsposition.model';
import { FloatspositionService } from './floatsposition.service';

@Component({
    selector: 'jhi-floatsposition-detail',
    templateUrl: './floatsposition-detail.component.html'
})
export class FloatspositionDetailComponent implements OnInit, OnDestroy {

    floatsposition: Floatsposition;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private floatspositionService: FloatspositionService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInFloatspositions();
    }

    load(id) {
        this.floatspositionService.find(id).subscribe((floatsposition) => {
            this.floatsposition = floatsposition;
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

    registerChangeInFloatspositions() {
        this.eventSubscriber = this.eventManager.subscribe(
            'floatspositionListModification',
            (response) => this.load(this.floatsposition.id)
        );
    }
}
