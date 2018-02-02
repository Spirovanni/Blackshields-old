/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ArmoryTestModule } from '../../../test.module';
import { GroupsbadgesDialogComponent } from '../../../../../../main/webapp/app/entities/groupsbadges/groupsbadges-dialog.component';
import { GroupsbadgesService } from '../../../../../../main/webapp/app/entities/groupsbadges/groupsbadges.service';
import { Groupsbadges } from '../../../../../../main/webapp/app/entities/groupsbadges/groupsbadges.model';

describe('Component Tests', () => {

    describe('Groupsbadges Management Dialog Component', () => {
        let comp: GroupsbadgesDialogComponent;
        let fixture: ComponentFixture<GroupsbadgesDialogComponent>;
        let service: GroupsbadgesService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ArmoryTestModule],
                declarations: [GroupsbadgesDialogComponent],
                providers: [
                    GroupsbadgesService
                ]
            })
            .overrideTemplate(GroupsbadgesDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(GroupsbadgesDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GroupsbadgesService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Groupsbadges(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.groupsbadges = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'groupsbadgesListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Groupsbadges();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.groupsbadges = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'groupsbadgesListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
