import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Session } from './session.model';
import { SessionPopupService } from './session-popup.service';
import { SessionService } from './session.service';
import { Speaker, SpeakerService } from '../speaker';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-session-dialog',
    templateUrl: './session-dialog.component.html'
})
export class SessionDialogComponent implements OnInit {

    session: Session;
    isSaving: boolean;

    speakers: Speaker[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private sessionService: SessionService,
        private speakerService: SpeakerService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.speakerService.query()
            .subscribe((res: ResponseWrapper) => { this.speakers = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.session.id !== undefined) {
            this.subscribeToSaveResponse(
                this.sessionService.update(this.session));
        } else {
            this.subscribeToSaveResponse(
                this.sessionService.create(this.session));
        }
    }

    private subscribeToSaveResponse(result: Observable<Session>) {
        result.subscribe((res: Session) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Session) {
        this.eventManager.broadcast({ name: 'sessionListModification', content: 'OK'});
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

    trackSpeakerById(index: number, item: Speaker) {
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
    selector: 'jhi-session-popup',
    template: ''
})
export class SessionPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private sessionPopupService: SessionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.sessionPopupService
                    .open(SessionDialogComponent as Component, params['id']);
            } else {
                this.sessionPopupService
                    .open(SessionDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
