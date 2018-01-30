import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Floatsposition } from './floatsposition.model';
import { ResponseWrapper, createRequestOption } from '../../../shared/index';

@Injectable()
export class FloatspositionService {

    private resourceUrl =  SERVER_API_URL + 'api/floatspositions';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/floatspositions';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(floatsposition: Floatsposition): Observable<Floatsposition> {
        const copy = this.convert(floatsposition);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(floatsposition: Floatsposition): Observable<Floatsposition> {
        const copy = this.convert(floatsposition);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Floatsposition> {
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
     * Convert a returned JSON object to Floatsposition.
     */
    private convertItemFromServer(json: any): Floatsposition {
        const entity: Floatsposition = Object.assign(new Floatsposition(), json);
        entity.date = this.dateUtils
            .convertLocalDateFromServer(json.date);
        return entity;
    }

    /**
     * Convert a Floatsposition to a JSON which can be sent to the server.
     */
    private convert(floatsposition: Floatsposition): Floatsposition {
        const copy: Floatsposition = Object.assign({}, floatsposition);
        copy.date = this.dateUtils
            .convertLocalDateToServer(floatsposition.date);
        return copy;
    }
}
