/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ArmoryTestModule } from '../../../test.module';
import { ButtonsDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/bootstrap/buttons/buttons-delete-dialog.component';
import { ButtonsService } from '../../../../../../main/webapp/app/entities/bootstrap/buttons/buttons.service';

describe('Component Tests', () => {

    describe('Buttons Management Delete Component', () => {
        let comp: ButtonsDeleteDialogComponent;
        let fixture: ComponentFixture<ButtonsDeleteDialogComponent>;
        let service: ButtonsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ArmoryTestModule],
                declarations: [ButtonsDeleteDialogComponent],
                providers: [
                    ButtonsService
                ]
            })
            .overrideTemplate(ButtonsDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ButtonsDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ButtonsService);
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
