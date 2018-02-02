import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Forms } from './forms.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class FormsService {

    private resourceUrl =  SERVER_API_URL + 'api/forms';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/forms';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(forms: Forms): Observable<Forms> {
        const copy = this.convert(forms);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(forms: Forms): Observable<Forms> {
        const copy = this.convert(forms);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Forms> {
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
     * Convert a returned JSON object to Forms.
     */
    private convertItemFromServer(json: any): Forms {
        const entity: Forms = Object.assign(new Forms(), json);
        entity.date = this.dateUtils
            .convertLocalDateFromServer(json.date);
        return entity;
    }

    /**
     * Convert a Forms to a JSON which can be sent to the server.
     */
    private convert(forms: Forms): Forms {
        const copy: Forms = Object.assign({}, forms);
        copy.date = this.dateUtils
            .convertLocalDateToServer(forms.date);
        return copy;
    }
}
