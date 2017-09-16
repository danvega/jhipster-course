import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Speaker } from './speaker.model';
import { SpeakerPopupService } from './speaker-popup.service';
import { SpeakerService } from './speaker.service';
import { Session, SessionService } from '../session';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-speaker-dialog',
    templateUrl: './speaker-dialog.component.html'
})
export class SpeakerDialogComponent implements OnInit {

    speaker: Speaker;
    isSaving: boolean;

    sessions: Session[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private speakerService: SpeakerService,
        private sessionService: SessionService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.sessionService.query()
            .subscribe((res: ResponseWrapper) => { this.sessions = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.speaker.id !== undefined) {
            this.subscribeToSaveResponse(
                this.speakerService.update(this.speaker));
        } else {
            this.subscribeToSaveResponse(
                this.speakerService.create(this.speaker));
        }
    }

    private subscribeToSaveResponse(result: Observable<Speaker>) {
        result.subscribe((res: Speaker) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Speaker) {
        this.eventManager.broadcast({ name: 'speakerListModification', content: 'OK'});
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

    trackSessionById(index: number, item: Session) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-speaker-popup',
    template: ''
})
export class SpeakerPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private speakerPopupService: SpeakerPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.speakerPopupService
                    .open(SpeakerDialogComponent as Component, params['id']);
            } else {
                this.speakerPopupService
                    .open(SpeakerDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
