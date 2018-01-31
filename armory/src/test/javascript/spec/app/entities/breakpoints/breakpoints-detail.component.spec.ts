/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { ArmoryTestModule } from '../../../test.module';
import { BreakpointsDetailComponent } from '../../../../../../main/webapp/app/entities/bootstrap/1-Utilities/breakpoints/breakpoints-detail.component';
import { BreakpointsService } from '../../../../../../main/webapp/app/entities/bootstrap/1-Utilities/breakpoints/breakpoints.service';
import { Breakpoints } from '../../../../../../main/webapp/app/entities/bootstrap/1-Utilities/breakpoints/breakpoints.model';

describe('Component Tests', () => {

    describe('Breakpoints Management Detail Component', () => {
        let comp: BreakpointsDetailComponent;
        let fixture: ComponentFixture<BreakpointsDetailComponent>;
        let service: BreakpointsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ArmoryTestModule],
                declarations: [BreakpointsDetailComponent],
                providers: [
                    BreakpointsService
                ]
            })
            .overrideTemplate(BreakpointsDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BreakpointsDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BreakpointsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Breakpoints(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.breakpoints).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
