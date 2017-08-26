/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { JblogTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { PostDetailComponent } from '../../../../../../main/webapp/app/entities/post/post-detail.component';
import { PostService } from '../../../../../../main/webapp/app/entities/post/post.service';
import { Post } from '../../../../../../main/webapp/app/entities/post/post.model';

describe('Component Tests', () => {

    describe('Post Management Detail Component', () => {
        let comp: PostDetailComponent;
        let fixture: ComponentFixture<PostDetailComponent>;
        let service: PostService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JblogTestModule],
                declarations: [PostDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    PostService,
                    JhiEventManager
                ]
            }).overrideTemplate(PostDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PostDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PostService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Post(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.post).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
