import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager  } from 'ng-jhipster';

import { Task } from './task.model';
import { TaskService } from './task.service';

@Component({
    selector: 'jhi-task-detail',
    templateUrl: './task-detail.component.html'
})
export class TaskDetailComponent implements OnInit, OnDestroy {

    task: Task;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private taskService: TaskService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTasks();
    }

    load(id) {
        this.taskService.find(id).subscribe((task) => {
            this.task = task;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTasks() {
        this.eventSubscriber = this.eventManager.subscribe(
            'taskListModification',
            (response) => this.load(this.task.id)
        );
    }
}
