import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { TasksTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { TaskDetailComponent } from '../../../../../../main/webapp/app/entities/task/task-detail.component';
import { TaskService } from '../../../../../../main/webapp/app/entities/task/task.service';
import { Task } from '../../../../../../main/webapp/app/entities/task/task.model';

describe('Component Tests', () => {

    describe('Task Management Detail Component', () => {
        let comp: TaskDetailComponent;
        let fixture: ComponentFixture<TaskDetailComponent>;
        let service: TaskService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TasksTestModule],
                declarations: [TaskDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    TaskService,
                    JhiEventManager
                ]
            }).overrideTemplate(TaskDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TaskDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TaskService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Task(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.task).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
