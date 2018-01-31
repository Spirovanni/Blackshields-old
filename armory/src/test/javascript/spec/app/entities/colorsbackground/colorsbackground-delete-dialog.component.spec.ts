/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ArmoryTestModule } from '../../../test.module';
import { ColorsbackgroundDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/bootstrap/1-Utilities/colorsbackground/colorsbackground-delete-dialog.component';
import { ColorsbackgroundService } from '../../../../../../main/webapp/app/entities/bootstrap/1-Utilities/colorsbackground/colorsbackground.service';

describe('Component Tests', () => {

    describe('Colorsbackground Management Delete Component', () => {
        let comp: ColorsbackgroundDeleteDialogComponent;
        let fixture: ComponentFixture<ColorsbackgroundDeleteDialogComponent>;
        let service: ColorsbackgroundService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ArmoryTestModule],
                declarations: [ColorsbackgroundDeleteDialogComponent],
                providers: [
                    ColorsbackgroundService
                ]
            })
            .overrideTemplate(ColorsbackgroundDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ColorsbackgroundDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ColorsbackgroundService);
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
