/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { ArmoryTestModule } from '../../../test.module';
import { GroupsbadgesComponent } from '../../../../../../main/webapp/app/entities/groupsbadges/groupsbadges.component';
import { GroupsbadgesService } from '../../../../../../main/webapp/app/entities/groupsbadges/groupsbadges.service';
import { Groupsbadges } from '../../../../../../main/webapp/app/entities/groupsbadges/groupsbadges.model';

describe('Component Tests', () => {

    describe('Groupsbadges Management Component', () => {
        let comp: GroupsbadgesComponent;
        let fixture: ComponentFixture<GroupsbadgesComponent>;
        let service: GroupsbadgesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ArmoryTestModule],
                declarations: [GroupsbadgesComponent],
                providers: [
                    GroupsbadgesService
                ]
            })
            .overrideTemplate(GroupsbadgesComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(GroupsbadgesComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GroupsbadgesService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Groupsbadges(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.groupsbadges[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
