import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {map, Observable} from 'rxjs';
import {CreateDocumentPayload, PaginatedDocumentsResponse} from '../models/document';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private readonly baseUrl = `${environment.apiBaseUrl}/documents`;

  constructor(private http: HttpClient) {
  }

  getDocuments(page: number = 1,
               pageSize: number = 10,
               filters: { [key: string]: any } = {},
               orderBy: string = ''):
    Observable<PaginatedDocumentsResponse> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('page_size', pageSize.toString());

    Object.keys(filters).forEach((key) => {
      if (filters[key] !== null && filters[key] !== undefined && filters[key] !== '') {
        params = params.set(key, filters[key]);
      }
    });

    if (orderBy) {
      if (orderBy === 'lastUpdatedAt') {
        orderBy = 'last_updated_at';
      } else if (orderBy === 'createdAt') {
        orderBy = 'created_at';
      } else if (orderBy === '-lastUpdatedAt') {
        orderBy = '-last_updated_at';
      } else if (orderBy === '-createdAt') {
        orderBy = '-created_at';
      }
      params = params.set('order_by', orderBy);
    }

    return this.http.get<PaginatedDocumentsResponse>(this.baseUrl, {params}).pipe(
      map((response) => ({
        ...response,
        data: response.data.map((doc) => ({
          ...doc
        })),
      }))
    );
  }

  deleteDocument(documentId: number): Observable<void> {
    const url = `${this.baseUrl}/${documentId}/`;
    return this.http.delete<void>(url);
  }

  createDocument(payload: CreateDocumentPayload): Observable<any> {
    const url = `${this.baseUrl}/`;
    return this.http.post<any>(url, payload);
  }

  patchDocument(documentId: number, payload: Partial<{ name: string; status: string }>): Observable<any> {
    const url = `${this.baseUrl}/${documentId}/`;
    return this.http.patch<any>(url, payload);
  }
}
