/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ArmoryTestModule } from '../../../test.module';
import { BasictypographyDialogComponent } from '../../../../../../main/webapp/app/entities/bootstrap/1-Utilities/basictypography/basictypography-dialog.component';
import { BasictypographyService } from '../../../../../../main/webapp/app/entities/bootstrap/1-Utilities/basictypography/basictypography.service';
import { Basictypography } from '../../../../../../main/webapp/app/entities/bootstrap/1-Utilities/basictypography/basictypography.model';

describe('Component Tests', () => {

    describe('Basictypography Management Dialog Component', () => {
        let comp: BasictypographyDialogComponent;
        let fixture: ComponentFixture<BasictypographyDialogComponent>;
        let service: BasictypographyService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ArmoryTestModule],
                declarations: [BasictypographyDialogComponent],
                providers: [
                    BasictypographyService
                ]
            })
            .overrideTemplate(BasictypographyDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BasictypographyDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BasictypographyService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Basictypography(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.basictypography = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'basictypographyListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Basictypography();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.basictypography = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'basictypographyListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
