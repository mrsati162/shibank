import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly http: HttpClient = inject(HttpClient);

  // Helper for error handling
  private handleError(error: any): Observable<never> {
    console.error('API Error:', error);
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  // GET request
  get<T>(baseUrl: string, path: string, params?: HttpParams): Observable<T> {
    return this.http.get<T>(`${baseUrl}/${path}`, { params })
      .pipe(
        catchError(this.handleError)
      );
  }

  // POST request
  post<T>(baseUrl: string, path: string, body: any, headers?: HttpHeaders): Observable<T> {
    return this.http.post<T>(`${baseUrl}/${path}`, body, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  // PUT request
  put<T>(baseUrl: string, path: string, body: any, headers?: HttpHeaders): Observable<T> {
    return this.http.put<T>(`${baseUrl}/${path}`, body, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  // DELETE request
  delete<T>(baseUrl: string, path: string, params?: HttpParams): Observable<T> {
    return this.http.delete<T>(`${baseUrl}/${path}`, { params })
      .pipe(
        catchError(this.handleError)
      );
  }
}
