import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Speaker } from './speaker.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class SpeakerService {

    private resourceUrl = 'api/speakers';

    constructor(private http: Http) { }

    create(speaker: Speaker): Observable<Speaker> {
        const copy = this.convert(speaker);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(speaker: Speaker): Observable<Speaker> {
        const copy = this.convert(speaker);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<Speaker> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            return res.json();
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
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }

    private convert(speaker: Speaker): Speaker {
        const copy: Speaker = Object.assign({}, speaker);
        return copy;
    }
}
