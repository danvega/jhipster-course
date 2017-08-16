import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { TasksTaskModule } from './task/task.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        TasksTaskModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TasksEntityModule {}
