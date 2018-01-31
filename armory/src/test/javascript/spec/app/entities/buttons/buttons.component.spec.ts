/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { ArmoryTestModule } from '../../../test.module';
import { ButtonsComponent } from '../../../../../../main/webapp/app/entities/bootstrap/buttons/buttons.component';
import { ButtonsService } from '../../../../../../main/webapp/app/entities/bootstrap/buttons/buttons.service';
import { Buttons } from '../../../../../../main/webapp/app/entities/bootstrap/buttons/buttons.model';

describe('Component Tests', () => {

    describe('Buttons Management Component', () => {
        let comp: ButtonsComponent;
        let fixture: ComponentFixture<ButtonsComponent>;
        let service: ButtonsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ArmoryTestModule],
                declarations: [ButtonsComponent],
                providers: [
                    ButtonsService
                ]
            })
            .overrideTemplate(ButtonsComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ButtonsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ButtonsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Buttons(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.buttons[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
