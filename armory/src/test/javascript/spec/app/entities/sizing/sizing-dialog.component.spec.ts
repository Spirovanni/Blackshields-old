/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ArmoryTestModule } from '../../../test.module';
import { SizingDialogComponent } from '../../../../../../main/webapp/app/entities/bootstrap/1-Utilities/sizing/sizing-dialog.component';
import { SizingService } from '../../../../../../main/webapp/app/entities/bootstrap/1-Utilities/sizing/sizing.service';
import { Sizing } from '../../../../../../main/webapp/app/entities/bootstrap/1-Utilities/sizing/sizing.model';

describe('Component Tests', () => {

    describe('Sizing Management Dialog Component', () => {
        let comp: SizingDialogComponent;
        let fixture: ComponentFixture<SizingDialogComponent>;
        let service: SizingService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ArmoryTestModule],
                declarations: [SizingDialogComponent],
                providers: [
                    SizingService
                ]
            })
            .overrideTemplate(SizingDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SizingDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SizingService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Sizing(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.sizing = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'sizingListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Sizing();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.sizing = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'sizingListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
