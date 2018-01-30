/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { ArmoryTestModule } from '../../../test.module';
import { SizingDetailComponent } from '../../../../../../main/webapp/app/entities/sizing/sizing-detail.component';
import { SizingService } from '../../../../../../main/webapp/app/entities/sizing/sizing.service';
import { Sizing } from '../../../../../../main/webapp/app/entities/sizing/sizing.model';

describe('Component Tests', () => {

    describe('Sizing Management Detail Component', () => {
        let comp: SizingDetailComponent;
        let fixture: ComponentFixture<SizingDetailComponent>;
        let service: SizingService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ArmoryTestModule],
                declarations: [SizingDetailComponent],
                providers: [
                    SizingService
                ]
            })
            .overrideTemplate(SizingDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SizingDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SizingService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Sizing(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.sizing).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
