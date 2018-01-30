import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Colorsbackground } from './colorsbackground.model';
import { ResponseWrapper, createRequestOption } from '../../../shared/index';

@Injectable()
export class ColorsbackgroundService {

    private resourceUrl =  SERVER_API_URL + 'api/colorsbackgrounds';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/colorsbackgrounds';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(colorsbackground: Colorsbackground): Observable<Colorsbackground> {
        const copy = this.convert(colorsbackground);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(colorsbackground: Colorsbackground): Observable<Colorsbackground> {
        const copy = this.convert(colorsbackground);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Colorsbackground> {
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
     * Convert a returned JSON object to Colorsbackground.
     */
    private convertItemFromServer(json: any): Colorsbackground {
        const entity: Colorsbackground = Object.assign(new Colorsbackground(), json);
        entity.date = this.dateUtils
            .convertLocalDateFromServer(json.date);
        return entity;
    }

    /**
     * Convert a Colorsbackground to a JSON which can be sent to the server.
     */
    private convert(colorsbackground: Colorsbackground): Colorsbackground {
        const copy: Colorsbackground = Object.assign({}, colorsbackground);
        copy.date = this.dateUtils
            .convertLocalDateToServer(colorsbackground.date);
        return copy;
    }
}
