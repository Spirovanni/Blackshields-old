/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { ArmoryTestModule } from '../../../test.module';
import { NavbarDetailComponent } from '../../../../../../main/webapp/app/entities/bootstrap/2-CSSComponents/navbar/navbar-detail.component';
import { NavbarService } from '../../../../../../main/webapp/app/entities/bootstrap/2-CSSComponents/navbar/navbar.service';
import { Navbar } from '../../../../../../main/webapp/app/entities/bootstrap/2-CSSComponents/navbar/navbar.model';

describe('Component Tests', () => {

    describe('Navbar Management Detail Component', () => {
        let comp: NavbarDetailComponent;
        let fixture: ComponentFixture<NavbarDetailComponent>;
        let service: NavbarService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ArmoryTestModule],
                declarations: [NavbarDetailComponent],
                providers: [
                    NavbarService
                ]
            })
            .overrideTemplate(NavbarDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(NavbarDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NavbarService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Navbar(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.navbar).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
