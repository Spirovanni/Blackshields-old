/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ArmoryTestModule } from '../../../test.module';
import { ButtonsDialogComponent } from '../../../../../../main/webapp/app/entities/bootstrap/buttons/buttons-dialog.component';
import { ButtonsService } from '../../../../../../main/webapp/app/entities/bootstrap/buttons/buttons.service';
import { Buttons } from '../../../../../../main/webapp/app/entities/bootstrap/buttons/buttons.model';

describe('Component Tests', () => {

    describe('Buttons Management Dialog Component', () => {
        let comp: ButtonsDialogComponent;
        let fixture: ComponentFixture<ButtonsDialogComponent>;
        let service: ButtonsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ArmoryTestModule],
                declarations: [ButtonsDialogComponent],
                providers: [
                    ButtonsService
                ]
            })
            .overrideTemplate(ButtonsDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ButtonsDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ButtonsService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Buttons(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.buttons = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'buttonsListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Buttons();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.buttons = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'buttonsListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
