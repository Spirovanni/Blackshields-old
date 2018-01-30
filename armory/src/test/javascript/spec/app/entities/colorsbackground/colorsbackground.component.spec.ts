/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { ArmoryTestModule } from '../../../test.module';
import { ColorsbackgroundComponent } from '../../../../../../main/webapp/app/entities/bootstrap/colorsbackground/colorsbackground.component';
import { ColorsbackgroundService } from '../../../../../../main/webapp/app/entities/bootstrap/colorsbackground/colorsbackground.service';
import { Colorsbackground } from '../../../../../../main/webapp/app/entities/bootstrap/colorsbackground/colorsbackground.model';

describe('Component Tests', () => {

    describe('Colorsbackground Management Component', () => {
        let comp: ColorsbackgroundComponent;
        let fixture: ComponentFixture<ColorsbackgroundComponent>;
        let service: ColorsbackgroundService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ArmoryTestModule],
                declarations: [ColorsbackgroundComponent],
                providers: [
                    ColorsbackgroundService
                ]
            })
            .overrideTemplate(ColorsbackgroundComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ColorsbackgroundComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ColorsbackgroundService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Colorsbackground(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.colorsbackgrounds[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
