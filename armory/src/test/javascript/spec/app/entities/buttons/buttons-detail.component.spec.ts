/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { ArmoryTestModule } from '../../../test.module';
import { ButtonsDetailComponent } from '../../../../../../main/webapp/app/entities/bootstrap/2-CSSComponents/buttons/buttons-detail.component';
import { ButtonsService } from '../../../../../../main/webapp/app/entities/bootstrap/2-CSSComponents/buttons/buttons.service';
import { Buttons } from '../../../../../../main/webapp/app/entities/bootstrap/2-CSSComponents/buttons/buttons.model';

describe('Component Tests', () => {

    describe('Buttons Management Detail Component', () => {
        let comp: ButtonsDetailComponent;
        let fixture: ComponentFixture<ButtonsDetailComponent>;
        let service: ButtonsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ArmoryTestModule],
                declarations: [ButtonsDetailComponent],
                providers: [
                    ButtonsService
                ]
            })
            .overrideTemplate(ButtonsDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ButtonsDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ButtonsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Buttons(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.buttons).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
