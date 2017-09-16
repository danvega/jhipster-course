import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Speaker } from './speaker.model';
import { SpeakerPopupService } from './speaker-popup.service';
import { SpeakerService } from './speaker.service';

@Component({
    selector: 'jhi-speaker-delete-dialog',
    templateUrl: './speaker-delete-dialog.component.html'
})
export class SpeakerDeleteDialogComponent {

    speaker: Speaker;

    constructor(
        private speakerService: SpeakerService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.speakerService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'speakerListModification',
                content: 'Deleted an speaker'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-speaker-delete-popup',
    template: ''
})
export class SpeakerDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private speakerPopupService: SpeakerPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.speakerPopupService
                .open(SpeakerDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
