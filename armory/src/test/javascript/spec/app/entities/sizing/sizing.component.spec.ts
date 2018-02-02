/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { ArmoryTestModule } from '../../../test.module';
import { SizingComponent } from '../../../../../../main/webapp/app/entities/bootstrap/1-Utilities/sizing/sizing.component';
import { SizingService } from '../../../../../../main/webapp/app/entities/bootstrap/1-Utilities/sizing/sizing.service';
import { Sizing } from '../../../../../../main/webapp/app/entities/bootstrap/1-Utilities/sizing/sizing.model';

describe('Component Tests', () => {

    describe('Sizing Management Component', () => {
        let comp: SizingComponent;
        let fixture: ComponentFixture<SizingComponent>;
        let service: SizingService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ArmoryTestModule],
                declarations: [SizingComponent],
                providers: [
                    SizingService
                ]
            })
            .overrideTemplate(SizingComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SizingComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SizingService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Sizing(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.sizings[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
