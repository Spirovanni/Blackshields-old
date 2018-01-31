/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { ArmoryTestModule } from '../../../test.module';
import { BreakpointsComponent } from '../../../../../../main/webapp/app/entities/bootstrap/breakpoints/breakpoints.component';
import { BreakpointsService } from '../../../../../../main/webapp/app/entities/bootstrap/breakpoints/breakpoints.service';
import { Breakpoints } from '../../../../../../main/webapp/app/entities/bootstrap/breakpoints/breakpoints.model';

describe('Component Tests', () => {

    describe('Breakpoints Management Component', () => {
        let comp: BreakpointsComponent;
        let fixture: ComponentFixture<BreakpointsComponent>;
        let service: BreakpointsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ArmoryTestModule],
                declarations: [BreakpointsComponent],
                providers: [
                    BreakpointsService
                ]
            })
            .overrideTemplate(BreakpointsComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BreakpointsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BreakpointsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Breakpoints(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.breakpoints[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
