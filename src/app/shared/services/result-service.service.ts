import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import {
  IPage,
  IRequestData,
  IResponseData,
  ICorporateEmployee
} from '../interfaces'
import { environment } from 'src/environments/environment';

/**
 * A server used to mock a paged data result from a server
 */
@Injectable()
export class ResultsService {
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json;charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    })
  };

  public constructor(
    private http: HttpClient
  ) { }

  /**
   * A method that mocks a paged server response
   * @param page The selected page
   * @returns {any} An observable containing the employee data
   */
  public getResults(page: IPage, search: string = ''): Observable<IResponseData<ICorporateEmployee>> {
    let req: IRequestData = { start: page.offset, limit: page.limit, filter: { search: search } };
    return this.http.post<IResponseData<ICorporateEmployee>>(`${environment.REST_SRV}${environment.REST_LIST}`, JSON.stringify(req), this.httpOptions);
  }

  public updatePerson(person: ICorporateEmployee): Observable<string | ICorporateEmployee> {
    if (person.id) {
      return this.http.put<ICorporateEmployee>(`${environment.REST_SRV}${environment.REST_PERSON}/${person.id}`,
        JSON.stringify(person), this.httpOptions);
    } else {
      return this.http.post<ICorporateEmployee>(`${environment.REST_SRV}${environment.REST_PERSON}/new`,
        JSON.stringify(person), this.httpOptions);
    }
  }

  public deletePerson(person: ICorporateEmployee): Observable<IResponseData<ICorporateEmployee>> {
    return this.http.delete<IResponseData<ICorporateEmployee>>(`${environment.REST_SRV}${environment.REST_PERSON}/${person.id}`, this.httpOptions);
  }

}
