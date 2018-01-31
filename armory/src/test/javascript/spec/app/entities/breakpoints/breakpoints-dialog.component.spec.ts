/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ArmoryTestModule } from '../../../test.module';
import { BreakpointsDialogComponent } from '../../../../../../main/webapp/app/entities/bootstrap/breakpoints/breakpoints-dialog.component';
import { BreakpointsService } from '../../../../../../main/webapp/app/entities/bootstrap/breakpoints/breakpoints.service';
import { Breakpoints } from '../../../../../../main/webapp/app/entities/bootstrap/breakpoints/breakpoints.model';

describe('Component Tests', () => {

    describe('Breakpoints Management Dialog Component', () => {
        let comp: BreakpointsDialogComponent;
        let fixture: ComponentFixture<BreakpointsDialogComponent>;
        let service: BreakpointsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ArmoryTestModule],
                declarations: [BreakpointsDialogComponent],
                providers: [
                    BreakpointsService
                ]
            })
            .overrideTemplate(BreakpointsDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BreakpointsDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BreakpointsService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Breakpoints(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.breakpoints = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'breakpointsListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Breakpoints();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.breakpoints = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'breakpointsListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
