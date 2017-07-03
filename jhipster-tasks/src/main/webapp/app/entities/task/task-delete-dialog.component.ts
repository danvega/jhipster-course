import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';

import { Task } from './task.model';
import { TaskPopupService } from './task-popup.service';
import { TaskService } from './task.service';

@Component({
    selector: 'jhi-task-delete-dialog',
    templateUrl: './task-delete-dialog.component.html'
})
export class TaskDeleteDialogComponent {

    task: Task;

    constructor(
        private taskService: TaskService,
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.taskService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'taskListModification',
                content: 'Deleted an task'
            });
            this.activeModal.dismiss(true);
        });
        this.alertService.success(`A Task is deleted with identifier ${id}`, null, null);
    }
}

@Component({
    selector: 'jhi-task-delete-popup',
    template: ''
})
export class TaskDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private taskPopupService: TaskPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.taskPopupService
                .open(TaskDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
