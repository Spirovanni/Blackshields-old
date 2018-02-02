import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Inputgroups } from './inputgroups.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class InputgroupsService {

    private resourceUrl =  SERVER_API_URL + 'api/inputgroups';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/inputgroups';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(inputgroups: Inputgroups): Observable<Inputgroups> {
        const copy = this.convert(inputgroups);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(inputgroups: Inputgroups): Observable<Inputgroups> {
        const copy = this.convert(inputgroups);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Inputgroups> {
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
     * Convert a returned JSON object to Inputgroups.
     */
    private convertItemFromServer(json: any): Inputgroups {
        const entity: Inputgroups = Object.assign(new Inputgroups(), json);
        entity.date = this.dateUtils
            .convertLocalDateFromServer(json.date);
        return entity;
    }

    /**
     * Convert a Inputgroups to a JSON which can be sent to the server.
     */
    private convert(inputgroups: Inputgroups): Inputgroups {
        const copy: Inputgroups = Object.assign({}, inputgroups);
        copy.date = this.dateUtils
            .convertLocalDateToServer(inputgroups.date);
        return copy;
    }
}
