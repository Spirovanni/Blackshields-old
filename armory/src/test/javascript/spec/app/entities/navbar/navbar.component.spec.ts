/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { ArmoryTestModule } from '../../../test.module';
import { NavbarComponent } from '../../../../../../main/webapp/app/entities/bootstrap/2-CSSComponents/navbar/navbar.component';
import { NavbarService } from '../../../../../../main/webapp/app/entities/bootstrap/2-CSSComponents/navbar/navbar.service';
import { Navbar } from '../../../../../../main/webapp/app/entities/bootstrap/2-CSSComponents/navbar/navbar.model';

describe('Component Tests', () => {

    describe('Navbar Management Component', () => {
        let comp: NavbarComponent;
        let fixture: ComponentFixture<NavbarComponent>;
        let service: NavbarService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ArmoryTestModule],
                declarations: [NavbarComponent],
                providers: [
                    NavbarService
                ]
            })
            .overrideTemplate(NavbarComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(NavbarComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NavbarService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Navbar(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.navbars[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
