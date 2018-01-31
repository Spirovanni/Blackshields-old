import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { Colorsbackground } from './colorsbackground.model';
import { ColorsbackgroundService } from './colorsbackground.service';

@Component({
    selector: 'jhi-colorsbackground-detail',
    templateUrl: './colorsbackground-detail.component.html'
})
export class ColorsbackgroundDetailComponent implements OnInit, OnDestroy {

    colorsbackground: Colorsbackground;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private colorsbackgroundService: ColorsbackgroundService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInColorsbackgrounds();
    }

    load(id) {
        this.colorsbackgroundService.find(id).subscribe((colorsbackground) => {
            this.colorsbackground = colorsbackground;
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

    registerChangeInColorsbackgrounds() {
        this.eventSubscriber = this.eventManager.subscribe(
            'colorsbackgroundListModification',
            (response) => this.load(this.colorsbackground.id)
        );
    }
}
