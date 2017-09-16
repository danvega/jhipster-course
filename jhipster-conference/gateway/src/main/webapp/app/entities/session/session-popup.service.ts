import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Session } from './session.model';
import { SessionService } from './session.service';

@Injectable()
export class SessionPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private sessionService: SessionService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.sessionService.find(id).subscribe((session) => {
                    session.startDateTime = this.datePipe
                        .transform(session.startDateTime, 'yyyy-MM-ddTHH:mm:ss');
                    session.endDateTime = this.datePipe
                        .transform(session.endDateTime, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.sessionModalRef(component, session);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.sessionModalRef(component, new Session());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    sessionModalRef(component: Component, session: Session): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.session = session;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
