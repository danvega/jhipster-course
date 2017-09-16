import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    SessionService,
    SessionPopupService,
    SessionComponent,
    SessionDetailComponent,
    SessionDialogComponent,
    SessionPopupComponent,
    SessionDeletePopupComponent,
    SessionDeleteDialogComponent,
    sessionRoute,
    sessionPopupRoute,
} from './';

const ENTITY_STATES = [
    ...sessionRoute,
    ...sessionPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        SessionComponent,
        SessionDetailComponent,
        SessionDialogComponent,
        SessionDeleteDialogComponent,
        SessionPopupComponent,
        SessionDeletePopupComponent,
    ],
    entryComponents: [
        SessionComponent,
        SessionDialogComponent,
        SessionPopupComponent,
        SessionDeleteDialogComponent,
        SessionDeletePopupComponent,
    ],
    providers: [
        SessionService,
        SessionPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewaySessionModule {}
