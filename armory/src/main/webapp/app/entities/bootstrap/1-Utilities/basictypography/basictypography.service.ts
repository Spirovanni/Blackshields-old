import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Basictypography } from './basictypography.model';
import { ResponseWrapper, createRequestOption } from '../../../../shared/index';

@Injectable()
export class BasictypographyService {

    private resourceUrl =  SERVER_API_URL + 'api/basictypographies';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/basictypographies';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(basictypography: Basictypography): Observable<Basictypography> {
        const copy = this.convert(basictypography);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(basictypography: Basictypography): Observable<Basictypography> {
        const copy = this.convert(basictypography);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Basictypography> {
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
     * Convert a returned JSON object to Basictypography.
     */
    private convertItemFromServer(json: any): Basictypography {
        const entity: Basictypography = Object.assign(new Basictypography(), json);
        entity.date = this.dateUtils
            .convertLocalDateFromServer(json.date);
        return entity;
    }

    /**
     * Convert a Basictypography to a JSON which can be sent to the server.
     */
    private convert(basictypography: Basictypography): Basictypography {
        const copy: Basictypography = Object.assign({}, basictypography);
        copy.date = this.dateUtils
            .convertLocalDateToServer(basictypography.date);
        return copy;
    }
}
