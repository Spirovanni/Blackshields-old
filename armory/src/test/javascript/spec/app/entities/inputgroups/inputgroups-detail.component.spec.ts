/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { ArmoryTestModule } from '../../../test.module';
import { InputgroupsDetailComponent } from '../../../../../../main/webapp/app/entities/inputgroups/inputgroups-detail.component';
import { InputgroupsService } from '../../../../../../main/webapp/app/entities/inputgroups/inputgroups.service';
import { Inputgroups } from '../../../../../../main/webapp/app/entities/inputgroups/inputgroups.model';

describe('Component Tests', () => {

    describe('Inputgroups Management Detail Component', () => {
        let comp: InputgroupsDetailComponent;
        let fixture: ComponentFixture<InputgroupsDetailComponent>;
        let service: InputgroupsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ArmoryTestModule],
                declarations: [InputgroupsDetailComponent],
                providers: [
                    InputgroupsService
                ]
            })
            .overrideTemplate(InputgroupsDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(InputgroupsDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InputgroupsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Inputgroups(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.inputgroups).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
