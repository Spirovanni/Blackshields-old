/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ArmoryTestModule } from '../../../test.module';
import { SpacingDialogComponent } from '../../../../../../main/webapp/app/entities/bootstrap/spacing/spacing-dialog.component';
import { SpacingService } from '../../../../../../main/webapp/app/entities/bootstrap/spacing/spacing.service';
import { Spacing } from '../../../../../../main/webapp/app/entities/bootstrap/spacing/spacing.model';

describe('Component Tests', () => {

    describe('Spacing Management Dialog Component', () => {
        let comp: SpacingDialogComponent;
        let fixture: ComponentFixture<SpacingDialogComponent>;
        let service: SpacingService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ArmoryTestModule],
                declarations: [SpacingDialogComponent],
                providers: [
                    SpacingService
                ]
            })
            .overrideTemplate(SpacingDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SpacingDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SpacingService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Spacing(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.spacing = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'spacingListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Spacing();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.spacing = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'spacingListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
