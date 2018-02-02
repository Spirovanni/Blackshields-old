/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { ArmoryTestModule } from '../../../test.module';
import { GroupsbadgesDetailComponent } from '../../../../../../main/webapp/app/entities/groupsbadges/groupsbadges-detail.component';
import { GroupsbadgesService } from '../../../../../../main/webapp/app/entities/groupsbadges/groupsbadges.service';
import { Groupsbadges } from '../../../../../../main/webapp/app/entities/groupsbadges/groupsbadges.model';

describe('Component Tests', () => {

    describe('Groupsbadges Management Detail Component', () => {
        let comp: GroupsbadgesDetailComponent;
        let fixture: ComponentFixture<GroupsbadgesDetailComponent>;
        let service: GroupsbadgesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ArmoryTestModule],
                declarations: [GroupsbadgesDetailComponent],
                providers: [
                    GroupsbadgesService
                ]
            })
            .overrideTemplate(GroupsbadgesDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(GroupsbadgesDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GroupsbadgesService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Groupsbadges(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.groupsbadges).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
