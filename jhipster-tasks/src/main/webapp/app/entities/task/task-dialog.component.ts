import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Task } from './task.model';
import { TaskPopupService } from './task-popup.service';
import { TaskService } from './task.service';

@Component({
    selector: 'jhi-task-dialog',
    templateUrl: './task-dialog.component.html'
})
export class TaskDialogComponent implements OnInit {

    task: Task;
    authorities: any[];
    isSaving: boolean;
    dueDateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private taskService: TaskService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.task.id !== undefined) {
            this.subscribeToSaveResponse(
                this.taskService.update(this.task), false);
        } else {
            this.subscribeToSaveResponse(
                this.taskService.create(this.task), true);
        }
    }

    private subscribeToSaveResponse(result: Observable<Task>, isCreated: boolean) {
        result.subscribe((res: Task) =>
            this.onSaveSuccess(res, isCreated), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Task, isCreated: boolean) {
        this.alertService.success(
            isCreated ? `A new Task is created with identifier ${result.id}`
            : `A Task is updated with identifier ${result.id}`,
            null, null);

        this.eventManager.broadcast({ name: 'taskListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError(error) {
        try {
            error.json();
        } catch (exception) {
            error.message = error.text();
        }
        this.isSaving = false;
        this.onError(error);
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-task-popup',
    template: ''
})
export class TaskPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private taskPopupService: TaskPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.taskPopupService
                    .open(TaskDialogComponent, params['id']);
            } else {
                this.modalRef = this.taskPopupService
                    .open(TaskDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
