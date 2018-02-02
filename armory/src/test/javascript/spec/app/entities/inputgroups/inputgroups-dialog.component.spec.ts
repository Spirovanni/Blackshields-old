/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ArmoryTestModule } from '../../../test.module';
import { InputgroupsDialogComponent } from '../../../../../../main/webapp/app/entities/inputgroups/inputgroups-dialog.component';
import { InputgroupsService } from '../../../../../../main/webapp/app/entities/inputgroups/inputgroups.service';
import { Inputgroups } from '../../../../../../main/webapp/app/entities/inputgroups/inputgroups.model';

describe('Component Tests', () => {

    describe('Inputgroups Management Dialog Component', () => {
        let comp: InputgroupsDialogComponent;
        let fixture: ComponentFixture<InputgroupsDialogComponent>;
        let service: InputgroupsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ArmoryTestModule],
                declarations: [InputgroupsDialogComponent],
                providers: [
                    InputgroupsService
                ]
            })
            .overrideTemplate(InputgroupsDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(InputgroupsDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InputgroupsService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Inputgroups(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.inputgroups = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'inputgroupsListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Inputgroups();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.inputgroups = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'inputgroupsListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
