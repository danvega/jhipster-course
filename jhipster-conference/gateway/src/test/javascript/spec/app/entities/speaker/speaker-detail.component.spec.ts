/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { SpeakerDetailComponent } from '../../../../../../main/webapp/app/entities/speaker/speaker-detail.component';
import { SpeakerService } from '../../../../../../main/webapp/app/entities/speaker/speaker.service';
import { Speaker } from '../../../../../../main/webapp/app/entities/speaker/speaker.model';

describe('Component Tests', () => {

    describe('Speaker Management Detail Component', () => {
        let comp: SpeakerDetailComponent;
        let fixture: ComponentFixture<SpeakerDetailComponent>;
        let service: SpeakerService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [SpeakerDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    SpeakerService,
                    JhiEventManager
                ]
            }).overrideTemplate(SpeakerDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SpeakerDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SpeakerService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Speaker(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.speaker).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
