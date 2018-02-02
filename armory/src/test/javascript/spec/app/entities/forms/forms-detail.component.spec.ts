/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { ArmoryTestModule } from '../../../test.module';
import { FormsDetailComponent } from '../../../../../../main/webapp/app/entities/forms/forms-detail.component';
import { FormsService } from '../../../../../../main/webapp/app/entities/forms/forms.service';
import { Forms } from '../../../../../../main/webapp/app/entities/forms/forms.model';

describe('Component Tests', () => {

    describe('Forms Management Detail Component', () => {
        let comp: FormsDetailComponent;
        let fixture: ComponentFixture<FormsDetailComponent>;
        let service: FormsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ArmoryTestModule],
                declarations: [FormsDetailComponent],
                providers: [
                    FormsService
                ]
            })
            .overrideTemplate(FormsDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FormsDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FormsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Forms(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.forms).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
