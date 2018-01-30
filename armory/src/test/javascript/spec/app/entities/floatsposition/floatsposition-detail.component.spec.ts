/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { ArmoryTestModule } from '../../../test.module';
import { FloatspositionDetailComponent } from '../../../../../../main/webapp/app/entities/bootstrap/floatsposition/floatsposition-detail.component';
import { FloatspositionService } from '../../../../../../main/webapp/app/entities/bootstrap/floatsposition/floatsposition.service';
import { Floatsposition } from '../../../../../../main/webapp/app/entities/bootstrap/floatsposition/floatsposition.model';

describe('Component Tests', () => {

    describe('Floatsposition Management Detail Component', () => {
        let comp: FloatspositionDetailComponent;
        let fixture: ComponentFixture<FloatspositionDetailComponent>;
        let service: FloatspositionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ArmoryTestModule],
                declarations: [FloatspositionDetailComponent],
                providers: [
                    FloatspositionService
                ]
            })
            .overrideTemplate(FloatspositionDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FloatspositionDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FloatspositionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Floatsposition(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.floatsposition).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
