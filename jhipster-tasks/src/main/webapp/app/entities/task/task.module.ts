import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TasksSharedModule } from '../../shared';
import {
    TaskService,
    TaskPopupService,
    TaskComponent,
    TaskDetailComponent,
    TaskDialogComponent,
    TaskPopupComponent,
    TaskDeletePopupComponent,
    TaskDeleteDialogComponent,
    taskRoute,
    taskPopupRoute,
} from './';

const ENTITY_STATES = [
    ...taskRoute,
    ...taskPopupRoute,
];

@NgModule({
    imports: [
        TasksSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        TaskComponent,
        TaskDetailComponent,
        TaskDialogComponent,
        TaskDeleteDialogComponent,
        TaskPopupComponent,
        TaskDeletePopupComponent,
    ],
    entryComponents: [
        TaskComponent,
        TaskDialogComponent,
        TaskPopupComponent,
        TaskDeleteDialogComponent,
        TaskDeletePopupComponent,
    ],
    providers: [
        TaskService,
        TaskPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TasksTaskModule {}
