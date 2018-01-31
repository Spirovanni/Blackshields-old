import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { Basictypography } from './basictypography.model';
import { BasictypographyService } from './basictypography.service';

@Component({
    selector: 'jhi-basictypography-detail',
    templateUrl: './basictypography-detail.component.html'
})
export class BasictypographyDetailComponent implements OnInit, OnDestroy {

    basictypography: Basictypography;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private basictypographyService: BasictypographyService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInBasictypographies();
    }

    load(id) {
        this.basictypographyService.find(id).subscribe((basictypography) => {
            this.basictypography = basictypography;
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

    registerChangeInBasictypographies() {
        this.eventSubscriber = this.eventManager.subscribe(
            'basictypographyListModification',
            (response) => this.load(this.basictypography.id)
        );
    }
}
