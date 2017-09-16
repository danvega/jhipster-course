import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiAlertService } from 'ng-jhipster';

import { Speaker } from './speaker.model';
import { SpeakerService } from './speaker.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-speaker',
    templateUrl: './speaker.component.html'
})
export class SpeakerComponent implements OnInit, OnDestroy {
speakers: Speaker[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private speakerService: SpeakerService,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.speakerService.query().subscribe(
            (res: ResponseWrapper) => {
                this.speakers = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInSpeakers();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Speaker) {
        return item.id;
    }
    registerChangeInSpeakers() {
        this.eventSubscriber = this.eventManager.subscribe('speakerListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
