import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { Buttons } from './buttons.model';
import { ButtonsService } from './buttons.service';

@Component({
    selector: 'jhi-buttons-detail',
    templateUrl: './buttons-detail.component.html'
})
export class ButtonsDetailComponent implements OnInit, OnDestroy {

    buttons: Buttons;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private buttonsService: ButtonsService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInButtons();
    }

    load(id) {
        this.buttonsService.find(id).subscribe((buttons) => {
            this.buttons = buttons;
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

    registerChangeInButtons() {
        this.eventSubscriber = this.eventManager.subscribe(
            'buttonsListModification',
            (response) => this.load(this.buttons.id)
        );
    }
}
