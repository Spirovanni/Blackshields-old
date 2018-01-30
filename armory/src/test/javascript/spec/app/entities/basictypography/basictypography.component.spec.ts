/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { ArmoryTestModule } from '../../../test.module';
import { BasictypographyComponent } from '../../../../../../main/webapp/app/entities/bootstrap/basictypography/basictypography.component';
import { BasictypographyService } from '../../../../../../main/webapp/app/entities/bootstrap/basictypography/basictypography.service';
import { Basictypography } from '../../../../../../main/webapp/app/entities/bootstrap/basictypography/basictypography.model';

describe('Component Tests', () => {

    describe('Basictypography Management Component', () => {
        let comp: BasictypographyComponent;
        let fixture: ComponentFixture<BasictypographyComponent>;
        let service: BasictypographyService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ArmoryTestModule],
                declarations: [BasictypographyComponent],
                providers: [
                    BasictypographyService
                ]
            })
            .overrideTemplate(BasictypographyComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BasictypographyComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BasictypographyService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Basictypography(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.basictypographies[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
