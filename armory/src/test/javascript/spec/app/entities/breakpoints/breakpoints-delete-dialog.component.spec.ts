/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ArmoryTestModule } from '../../../test.module';
import { BreakpointsDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/bootstrap/1-Utilities/breakpoints/breakpoints-delete-dialog.component';
import { BreakpointsService } from '../../../../../../main/webapp/app/entities/bootstrap/1-Utilities/breakpoints/breakpoints.service';

describe('Component Tests', () => {

    describe('Breakpoints Management Delete Component', () => {
        let comp: BreakpointsDeleteDialogComponent;
        let fixture: ComponentFixture<BreakpointsDeleteDialogComponent>;
        let service: BreakpointsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ArmoryTestModule],
                declarations: [BreakpointsDeleteDialogComponent],
                providers: [
                    BreakpointsService
                ]
            })
            .overrideTemplate(BreakpointsDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BreakpointsDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BreakpointsService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
