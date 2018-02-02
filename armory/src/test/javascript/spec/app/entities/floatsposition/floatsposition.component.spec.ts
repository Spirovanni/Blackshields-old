/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { ArmoryTestModule } from '../../../test.module';
import { FloatspositionComponent } from '../../../../../../main/webapp/app/entities/bootstrap/1-Utilities/floatsposition/floatsposition.component';
import { FloatspositionService } from '../../../../../../main/webapp/app/entities/bootstrap/1-Utilities/floatsposition/floatsposition.service';
import { Floatsposition } from '../../../../../../main/webapp/app/entities/bootstrap/1-Utilities/floatsposition/floatsposition.model';

describe('Component Tests', () => {

    describe('Floatsposition Management Component', () => {
        let comp: FloatspositionComponent;
        let fixture: ComponentFixture<FloatspositionComponent>;
        let service: FloatspositionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ArmoryTestModule],
                declarations: [FloatspositionComponent],
                providers: [
                    FloatspositionService
                ]
            })
            .overrideTemplate(FloatspositionComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FloatspositionComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FloatspositionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Floatsposition(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.floatspositions[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
