import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { SpeakerComponent } from './speaker.component';
import { SpeakerDetailComponent } from './speaker-detail.component';
import { SpeakerPopupComponent } from './speaker-dialog.component';
import { SpeakerDeletePopupComponent } from './speaker-delete-dialog.component';

export const speakerRoute: Routes = [
    {
        path: 'speaker',
        component: SpeakerComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Speakers'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'speaker/:id',
        component: SpeakerDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Speakers'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const speakerPopupRoute: Routes = [
    {
        path: 'speaker-new',
        component: SpeakerPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Speakers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'speaker/:id/edit',
        component: SpeakerPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Speakers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'speaker/:id/delete',
        component: SpeakerDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Speakers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
