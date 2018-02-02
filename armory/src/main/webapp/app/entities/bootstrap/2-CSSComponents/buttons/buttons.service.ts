import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Buttons } from './buttons.model';
import { ResponseWrapper, createRequestOption } from '../../../../shared/index';

@Injectable()
export class ButtonsService {

    private resourceUrl =  SERVER_API_URL + 'api/buttons';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/buttons';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(buttons: Buttons): Observable<Buttons> {
        const copy = this.convert(buttons);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(buttons: Buttons): Observable<Buttons> {
        const copy = this.convert(buttons);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Buttons> {
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
     * Convert a returned JSON object to Buttons.
     */
    private convertItemFromServer(json: any): Buttons {
        const entity: Buttons = Object.assign(new Buttons(), json);
        entity.date = this.dateUtils
            .convertLocalDateFromServer(json.date);
        return entity;
    }

    /**
     * Convert a Buttons to a JSON which can be sent to the server.
     */
    private convert(buttons: Buttons): Buttons {
        const copy: Buttons = Object.assign({}, buttons);
        copy.date = this.dateUtils
            .convertLocalDateToServer(buttons.date);
        return copy;
    }
}
