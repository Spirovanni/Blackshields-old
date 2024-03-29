/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ArmoryTestModule } from '../../../test.module';
import { NavbarDialogComponent } from '../../../../../../main/webapp/app/entities/bootstrap/2-CSSComponents/navbar/navbar-dialog.component';
import { NavbarService } from '../../../../../../main/webapp/app/entities/bootstrap/2-CSSComponents/navbar/navbar.service';
import { Navbar } from '../../../../../../main/webapp/app/entities/bootstrap/2-CSSComponents/navbar/navbar.model';

describe('Component Tests', () => {

    describe('Navbar Management Dialog Component', () => {
        let comp: NavbarDialogComponent;
        let fixture: ComponentFixture<NavbarDialogComponent>;
        let service: NavbarService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ArmoryTestModule],
                declarations: [NavbarDialogComponent],
                providers: [
                    NavbarService
                ]
            })
            .overrideTemplate(NavbarDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(NavbarDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NavbarService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Navbar(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.navbar = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'navbarListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Navbar();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.navbar = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'navbarListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
