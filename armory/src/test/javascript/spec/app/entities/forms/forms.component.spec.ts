/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { ArmoryTestModule } from '../../../test.module';
import { FormsComponent } from '../../../../../../main/webapp/app/entities/forms/forms.component';
import { FormsService } from '../../../../../../main/webapp/app/entities/forms/forms.service';
import { Forms } from '../../../../../../main/webapp/app/entities/forms/forms.model';

describe('Component Tests', () => {

    describe('Forms Management Component', () => {
        let comp: FormsComponent;
        let fixture: ComponentFixture<FormsComponent>;
        let service: FormsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ArmoryTestModule],
                declarations: [FormsComponent],
                providers: [
                    FormsService
                ]
            })
            .overrideTemplate(FormsComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FormsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FormsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Forms(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.forms[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
