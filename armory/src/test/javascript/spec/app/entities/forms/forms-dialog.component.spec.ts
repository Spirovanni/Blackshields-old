/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ArmoryTestModule } from '../../../test.module';
import { FormsDialogComponent } from '../../../../../../main/webapp/app/entities/forms/forms-dialog.component';
import { FormsService } from '../../../../../../main/webapp/app/entities/forms/forms.service';
import { Forms } from '../../../../../../main/webapp/app/entities/forms/forms.model';

describe('Component Tests', () => {

    describe('Forms Management Dialog Component', () => {
        let comp: FormsDialogComponent;
        let fixture: ComponentFixture<FormsDialogComponent>;
        let service: FormsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ArmoryTestModule],
                declarations: [FormsDialogComponent],
                providers: [
                    FormsService
                ]
            })
            .overrideTemplate(FormsDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FormsDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FormsService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Forms(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.forms = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'formsListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Forms();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.forms = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'formsListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
