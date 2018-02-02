/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { ArmoryTestModule } from '../../../test.module';
import { InputgroupsComponent } from '../../../../../../main/webapp/app/entities/inputgroups/inputgroups.component';
import { InputgroupsService } from '../../../../../../main/webapp/app/entities/inputgroups/inputgroups.service';
import { Inputgroups } from '../../../../../../main/webapp/app/entities/inputgroups/inputgroups.model';

describe('Component Tests', () => {

    describe('Inputgroups Management Component', () => {
        let comp: InputgroupsComponent;
        let fixture: ComponentFixture<InputgroupsComponent>;
        let service: InputgroupsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ArmoryTestModule],
                declarations: [InputgroupsComponent],
                providers: [
                    InputgroupsService
                ]
            })
            .overrideTemplate(InputgroupsComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(InputgroupsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InputgroupsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Inputgroups(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.inputgroups[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
