/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { ArmoryTestModule } from '../../../test.module';
import { SpacingComponent } from '../../../../../../main/webapp/app/entities/bootstrap/spacing/spacing.component';
import { SpacingService } from '../../../../../../main/webapp/app/entities/bootstrap/spacing/spacing.service';
import { Spacing } from '../../../../../../main/webapp/app/entities/bootstrap/spacing/spacing.model';

describe('Component Tests', () => {

    describe('Spacing Management Component', () => {
        let comp: SpacingComponent;
        let fixture: ComponentFixture<SpacingComponent>;
        let service: SpacingService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ArmoryTestModule],
                declarations: [SpacingComponent],
                providers: [
                    SpacingService
                ]
            })
            .overrideTemplate(SpacingComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SpacingComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SpacingService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Spacing(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.spacings[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
