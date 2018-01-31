/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { ArmoryTestModule } from '../../../test.module';
import { TextalignmentdisplayDetailComponent } from '../../../../../../main/webapp/app/entities/bootstrap/1-Utilities/textalignmentdisplay/textalignmentdisplay-detail.component';
import { TextalignmentdisplayService } from '../../../../../../main/webapp/app/entities/bootstrap/1-Utilities/textalignmentdisplay/textalignmentdisplay.service';
import { Textalignmentdisplay } from '../../../../../../main/webapp/app/entities/bootstrap/1-Utilities/textalignmentdisplay/textalignmentdisplay.model';

describe('Component Tests', () => {

    describe('Textalignmentdisplay Management Detail Component', () => {
        let comp: TextalignmentdisplayDetailComponent;
        let fixture: ComponentFixture<TextalignmentdisplayDetailComponent>;
        let service: TextalignmentdisplayService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ArmoryTestModule],
                declarations: [TextalignmentdisplayDetailComponent],
                providers: [
                    TextalignmentdisplayService
                ]
            })
            .overrideTemplate(TextalignmentdisplayDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TextalignmentdisplayDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TextalignmentdisplayService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Textalignmentdisplay(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.textalignmentdisplay).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
