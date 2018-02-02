import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Groupsbadges } from './groupsbadges.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class GroupsbadgesService {

    private resourceUrl =  SERVER_API_URL + 'api/groupsbadges';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/groupsbadges';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(groupsbadges: Groupsbadges): Observable<Groupsbadges> {
        const copy = this.convert(groupsbadges);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(groupsbadges: Groupsbadges): Observable<Groupsbadges> {
        const copy = this.convert(groupsbadges);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Groupsbadges> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
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

    search(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceSearchUrl, options)
            .map((res: any) => this.convertResponse(res));
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to Groupsbadges.
     */
    private convertItemFromServer(json: any): Groupsbadges {
        const entity: Groupsbadges = Object.assign(new Groupsbadges(), json);
        entity.date = this.dateUtils
            .convertLocalDateFromServer(json.date);
        return entity;
    }

    /**
     * Convert a Groupsbadges to a JSON which can be sent to the server.
     */
    private convert(groupsbadges: Groupsbadges): Groupsbadges {
        const copy: Groupsbadges = Object.assign({}, groupsbadges);
        copy.date = this.dateUtils
            .convertLocalDateToServer(groupsbadges.date);
        return copy;
    }
}
