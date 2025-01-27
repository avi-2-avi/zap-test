import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {PaginatedSignersResponse} from '../models/signer';
import {PaginatedDocumentsResponse} from '../models/document';

@Injectable({
  providedIn: 'root'
})
export class SignerService {
  private readonly baseUrl = `${environment.apiBaseUrl}/signers`;

  constructor(private http: HttpClient) {
  }

  getSigners(page: number = 1,
             pageSize: number = 10,
             filters: { [key: string]: any } = {},
             orderBy: string = ''):
    Observable<PaginatedSignersResponse> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('page_size', pageSize.toString());

    Object.keys(filters).forEach((key) => {
      if (filters[key] !== null && filters[key] !== undefined && filters[key] !== '') {
        params = params.set(key, filters[key]);
      }
    });

    if (orderBy) {
      params = params.set('order_by', orderBy);
    }

    return this.http.get<PaginatedSignersResponse>(this.baseUrl, {params}).pipe(
      map((response) => ({
        ...response,
        data: response.data.map((doc) => ({
          ...doc
        })),
      }))
    );
  }

  patchSigner(signerId: number, payload: Partial<{ name: string; email: string; status: string}>): Observable<any> {
    const url = `${this.baseUrl}/${signerId}/`;
    return this.http.patch<any>(url, payload);
  }
}
