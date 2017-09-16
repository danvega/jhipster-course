import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils } from 'ng-jhipster';

import { Session } from './session.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class SessionService {

    private resourceUrl = 'api/sessions';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(session: Session): Observable<Session> {
        const copy = this.convert(session);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    update(session: Session): Observable<Session> {
        const copy = this.convert(session);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    find(id: number): Observable<Session> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        for (let i = 0; i < jsonResponse.length; i++) {
            this.convertItemFromServer(jsonResponse[i]);
        }
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }

    private convertItemFromServer(entity: any) {
        entity.startDateTime = this.dateUtils
            .convertDateTimeFromServer(entity.startDateTime);
        entity.endDateTime = this.dateUtils
            .convertDateTimeFromServer(entity.endDateTime);
    }

    private convert(session: Session): Session {
        const copy: Session = Object.assign({}, session);

        copy.startDateTime = this.dateUtils.toDate(session.startDateTime);

        copy.endDateTime = this.dateUtils.toDate(session.endDateTime);
        return copy;
    }
}
