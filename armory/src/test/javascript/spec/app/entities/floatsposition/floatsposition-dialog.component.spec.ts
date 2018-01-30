/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ArmoryTestModule } from '../../../test.module';
import { FloatspositionDialogComponent } from '../../../../../../main/webapp/app/entities/bootstrap/floatsposition/floatsposition-dialog.component';
import { FloatspositionService } from '../../../../../../main/webapp/app/entities/bootstrap/floatsposition/floatsposition.service';
import { Floatsposition } from '../../../../../../main/webapp/app/entities/bootstrap/floatsposition/floatsposition.model';

describe('Component Tests', () => {

    describe('Floatsposition Management Dialog Component', () => {
        let comp: FloatspositionDialogComponent;
        let fixture: ComponentFixture<FloatspositionDialogComponent>;
        let service: FloatspositionService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ArmoryTestModule],
                declarations: [FloatspositionDialogComponent],
                providers: [
                    FloatspositionService
                ]
            })
            .overrideTemplate(FloatspositionDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FloatspositionDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FloatspositionService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Floatsposition(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.floatsposition = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'floatspositionListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Floatsposition();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.floatsposition = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'floatspositionListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
