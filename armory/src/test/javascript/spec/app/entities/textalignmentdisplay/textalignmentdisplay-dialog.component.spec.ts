/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ArmoryTestModule } from '../../../test.module';
import { TextalignmentdisplayDialogComponent } from '../../../../../../main/webapp/app/entities/bootstrap/1-Utilities/textalignmentdisplay/textalignmentdisplay-dialog.component';
import { TextalignmentdisplayService } from '../../../../../../main/webapp/app/entities/bootstrap/1-Utilities/textalignmentdisplay/textalignmentdisplay.service';
import { Textalignmentdisplay } from '../../../../../../main/webapp/app/entities/bootstrap/1-Utilities/textalignmentdisplay/textalignmentdisplay.model';

describe('Component Tests', () => {

    describe('Textalignmentdisplay Management Dialog Component', () => {
        let comp: TextalignmentdisplayDialogComponent;
        let fixture: ComponentFixture<TextalignmentdisplayDialogComponent>;
        let service: TextalignmentdisplayService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ArmoryTestModule],
                declarations: [TextalignmentdisplayDialogComponent],
                providers: [
                    TextalignmentdisplayService
                ]
            })
            .overrideTemplate(TextalignmentdisplayDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TextalignmentdisplayDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TextalignmentdisplayService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Textalignmentdisplay(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.textalignmentdisplay = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'textalignmentdisplayListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Textalignmentdisplay();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.textalignmentdisplay = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'textalignmentdisplayListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
