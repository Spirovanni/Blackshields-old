/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { ArmoryTestModule } from '../../../test.module';
import { TextalignmentdisplayComponent } from '../../../../../../main/webapp/app/entities/bootstrap/textalignmentdisplay/textalignmentdisplay.component';
import { TextalignmentdisplayService } from '../../../../../../main/webapp/app/entities/bootstrap/textalignmentdisplay/textalignmentdisplay.service';
import { Textalignmentdisplay } from '../../../../../../main/webapp/app/entities/bootstrap/textalignmentdisplay/textalignmentdisplay.model';

describe('Component Tests', () => {

    describe('Textalignmentdisplay Management Component', () => {
        let comp: TextalignmentdisplayComponent;
        let fixture: ComponentFixture<TextalignmentdisplayComponent>;
        let service: TextalignmentdisplayService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ArmoryTestModule],
                declarations: [TextalignmentdisplayComponent],
                providers: [
                    TextalignmentdisplayService
                ]
            })
            .overrideTemplate(TextalignmentdisplayComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TextalignmentdisplayComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TextalignmentdisplayService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Textalignmentdisplay(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.textalignmentdisplays[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
