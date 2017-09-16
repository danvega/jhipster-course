import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    SpeakerService,
    SpeakerPopupService,
    SpeakerComponent,
    SpeakerDetailComponent,
    SpeakerDialogComponent,
    SpeakerPopupComponent,
    SpeakerDeletePopupComponent,
    SpeakerDeleteDialogComponent,
    speakerRoute,
    speakerPopupRoute,
} from './';

const ENTITY_STATES = [
    ...speakerRoute,
    ...speakerPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        SpeakerComponent,
        SpeakerDetailComponent,
        SpeakerDialogComponent,
        SpeakerDeleteDialogComponent,
        SpeakerPopupComponent,
        SpeakerDeletePopupComponent,
    ],
    entryComponents: [
        SpeakerComponent,
        SpeakerDialogComponent,
        SpeakerPopupComponent,
        SpeakerDeleteDialogComponent,
        SpeakerDeletePopupComponent,
    ],
    providers: [
        SpeakerService,
        SpeakerPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewaySpeakerModule {}
