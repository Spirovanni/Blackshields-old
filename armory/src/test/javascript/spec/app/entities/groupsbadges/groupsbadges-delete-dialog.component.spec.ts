/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ArmoryTestModule } from '../../../test.module';
import { GroupsbadgesDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/groupsbadges/groupsbadges-delete-dialog.component';
import { GroupsbadgesService } from '../../../../../../main/webapp/app/entities/groupsbadges/groupsbadges.service';

describe('Component Tests', () => {

    describe('Groupsbadges Management Delete Component', () => {
        let comp: GroupsbadgesDeleteDialogComponent;
        let fixture: ComponentFixture<GroupsbadgesDeleteDialogComponent>;
        let service: GroupsbadgesService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ArmoryTestModule],
                declarations: [GroupsbadgesDeleteDialogComponent],
                providers: [
                    GroupsbadgesService
                ]
            })
            .overrideTemplate(GroupsbadgesDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(GroupsbadgesDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GroupsbadgesService);
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
