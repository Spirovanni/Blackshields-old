import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Navbar } from './navbar.model';
import { ResponseWrapper, createRequestOption } from '../../../../shared/index';

@Injectable()
export class NavbarService {

    private resourceUrl =  SERVER_API_URL + 'api/navbars';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/navbars';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(navbar: Navbar): Observable<Navbar> {
        const copy = this.convert(navbar);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(navbar: Navbar): Observable<Navbar> {
        const copy = this.convert(navbar);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Navbar> {
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
     * Convert a returned JSON object to Navbar.
     */
    private convertItemFromServer(json: any): Navbar {
        const entity: Navbar = Object.assign(new Navbar(), json);
        entity.date = this.dateUtils
            .convertLocalDateFromServer(json.date);
        return entity;
    }

    /**
     * Convert a Navbar to a JSON which can be sent to the server.
     */
    private convert(navbar: Navbar): Navbar {
        const copy: Navbar = Object.assign({}, navbar);
        copy.date = this.dateUtils
            .convertLocalDateToServer(navbar.date);
        return copy;
    }
}
