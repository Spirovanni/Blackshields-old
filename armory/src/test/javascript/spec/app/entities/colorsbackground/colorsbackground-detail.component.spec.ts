/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { ArmoryTestModule } from '../../../test.module';
import { ColorsbackgroundDetailComponent } from '../../../../../../main/webapp/app/entities/bootstrap/1-Utilities/colorsbackground/colorsbackground-detail.component';
import { ColorsbackgroundService } from '../../../../../../main/webapp/app/entities/bootstrap/1-Utilities/colorsbackground/colorsbackground.service';
import { Colorsbackground } from '../../../../../../main/webapp/app/entities/bootstrap/1-Utilities/colorsbackground/colorsbackground.model';

describe('Component Tests', () => {

    describe('Colorsbackground Management Detail Component', () => {
        let comp: ColorsbackgroundDetailComponent;
        let fixture: ComponentFixture<ColorsbackgroundDetailComponent>;
        let service: ColorsbackgroundService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ArmoryTestModule],
                declarations: [ColorsbackgroundDetailComponent],
                providers: [
                    ColorsbackgroundService
                ]
            })
            .overrideTemplate(ColorsbackgroundDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ColorsbackgroundDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ColorsbackgroundService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Colorsbackground(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.colorsbackground).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
