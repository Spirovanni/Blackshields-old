import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { Forms } from './forms.model';
import { FormsService } from './forms.service';

@Component({
    selector: 'jhi-forms-detail',
    templateUrl: './forms-detail.component.html'
})
export class FormsDetailComponent implements OnInit, OnDestroy {

    forms: Forms;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private formsService: FormsService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInForms();
    }

    load(id) {
        this.formsService.find(id).subscribe((forms) => {
            this.forms = forms;
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

    registerChangeInForms() {
        this.eventSubscriber = this.eventManager.subscribe(
            'formsListModification',
            (response) => this.load(this.forms.id)
        );
    }
}
