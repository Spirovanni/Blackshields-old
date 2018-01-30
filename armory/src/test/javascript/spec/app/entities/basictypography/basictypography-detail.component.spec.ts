/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { ArmoryTestModule } from '../../../test.module';
import { BasictypographyDetailComponent } from '../../../../../../main/webapp/app/entities/bootstrap/basictypography/basictypography-detail.component';
import { BasictypographyService } from '../../../../../../main/webapp/app/entities/bootstrap/basictypography/basictypography.service';
import { Basictypography } from '../../../../../../main/webapp/app/entities/bootstrap/basictypography/basictypography.model';

describe('Component Tests', () => {

    describe('Basictypography Management Detail Component', () => {
        let comp: BasictypographyDetailComponent;
        let fixture: ComponentFixture<BasictypographyDetailComponent>;
        let service: BasictypographyService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ArmoryTestModule],
                declarations: [BasictypographyDetailComponent],
                providers: [
                    BasictypographyService
                ]
            })
            .overrideTemplate(BasictypographyDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BasictypographyDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BasictypographyService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Basictypography(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.basictypography).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
