/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { ArmoryTestModule } from '../../../test.module';
import { SpacingDetailComponent } from '../../../../../../main/webapp/app/entities/bootstrap/1-Utilities/spacing/spacing-detail.component';
import { SpacingService } from '../../../../../../main/webapp/app/entities/bootstrap/1-Utilities/spacing/spacing.service';
import { Spacing } from '../../../../../../main/webapp/app/entities/bootstrap/1-Utilities/spacing/spacing.model';

describe('Component Tests', () => {

    describe('Spacing Management Detail Component', () => {
        let comp: SpacingDetailComponent;
        let fixture: ComponentFixture<SpacingDetailComponent>;
        let service: SpacingService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ArmoryTestModule],
                declarations: [SpacingDetailComponent],
                providers: [
                    SpacingService
                ]
            })
            .overrideTemplate(SpacingDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SpacingDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SpacingService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Spacing(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.spacing).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
