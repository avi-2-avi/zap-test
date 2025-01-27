import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {ListCompaniesResponse} from '../models/company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private readonly baseUrl = `${environment.apiBaseUrl}/companies`;

  constructor(private http: HttpClient) {
  }

  getCompanies(): Observable<ListCompaniesResponse> {
    return this.http.get<ListCompaniesResponse>(this.baseUrl).pipe(
      map((response) => ({
        ...response,
        data: response.data.map((company) => ({
          ...company
        })),
      }))
    );
  }

  createCompany(payload: {
    name: string;
    api_token: string;
  }): Observable<any> {
    const url = `${this.baseUrl}/`;
    return this.http.post(url, payload);
  }
}
