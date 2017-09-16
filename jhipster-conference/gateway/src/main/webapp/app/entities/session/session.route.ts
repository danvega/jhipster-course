import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { SessionComponent } from './session.component';
import { SessionDetailComponent } from './session-detail.component';
import { SessionPopupComponent } from './session-dialog.component';
import { SessionDeletePopupComponent } from './session-delete-dialog.component';

export const sessionRoute: Routes = [
    {
        path: 'session',
        component: SessionComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Sessions'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'session/:id',
        component: SessionDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Sessions'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const sessionPopupRoute: Routes = [
    {
        path: 'session-new',
        component: SessionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Sessions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'session/:id/edit',
        component: SessionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Sessions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'session/:id/delete',
        component: SessionDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Sessions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
