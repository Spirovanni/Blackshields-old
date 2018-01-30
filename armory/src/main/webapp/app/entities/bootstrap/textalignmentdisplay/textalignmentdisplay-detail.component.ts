import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { Textalignmentdisplay } from './textalignmentdisplay.model';
import { TextalignmentdisplayService } from './textalignmentdisplay.service';

@Component({
    selector: 'jhi-textalignmentdisplay-detail',
    templateUrl: './textalignmentdisplay-detail.component.html'
})
export class TextalignmentdisplayDetailComponent implements OnInit, OnDestroy {

    textalignmentdisplay: Textalignmentdisplay;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private textalignmentdisplayService: TextalignmentdisplayService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTextalignmentdisplays();
    }

    load(id) {
        this.textalignmentdisplayService.find(id).subscribe((textalignmentdisplay) => {
            this.textalignmentdisplay = textalignmentdisplay;
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

    registerChangeInTextalignmentdisplays() {
        this.eventSubscriber = this.eventManager.subscribe(
            'textalignmentdisplayListModification',
            (response) => this.load(this.textalignmentdisplay.id)
        );
    }
}
