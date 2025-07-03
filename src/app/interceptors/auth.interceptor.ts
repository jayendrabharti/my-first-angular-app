import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
  HttpBackend,
  HttpClient,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, filter, switchMap, take, finalize } from 'rxjs/operators';
import environment from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private router = inject(Router);
  private httpClient: HttpClient;

  private isRefreshing = false;
  private refreshTokenSubject = new BehaviorSubject<boolean>(false);

  private authEndpoints = [
    '/auth/login',
    '/auth/refresh',
    '/auth/logout',
    '/auth/register',
  ];

  private refreshUrl = `${environment.apiBaseUrl}/api/auth/refresh`;
  private logoutUrl = `${environment.apiBaseUrl}/api/auth/logout`;

  constructor(private httpBackend: HttpBackend) {
    this.httpClient = new HttpClient(httpBackend);
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Skip interceptor for auth endpoints
    if (this.isAuthEndpoint(req.url)) {
      return next.handle(req.clone({ withCredentials: true }));
    }

    const authReq = req.clone({ withCredentials: true });

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          return this.handle401Error(authReq, next);
        }
        return throwError(() => error);
      })
    );
  }

  private isAuthEndpoint(url: string): boolean {
    return this.authEndpoints.some((endpoint) => url.includes(endpoint));
  }

  handle401Error(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(false);

      return this.httpClient
        .post(this.refreshUrl, {}, { withCredentials: true })
        .pipe(
          switchMap((response: any) => {
            this.refreshTokenSubject.next(true);
            return next.handle(request.clone({ withCredentials: true }));
          }),
          catchError((refreshError: HttpErrorResponse) => {
            this.performLogout();
            return throwError(() => refreshError);
          }),
          finalize(() => {
            this.isRefreshing = false;
            setTimeout(() => this.refreshTokenSubject.next(false), 100);
          })
        );
    } else {
      return this.refreshTokenSubject.pipe(
        filter((refreshed) => refreshed),
        take(1),
        switchMap(() => next.handle(request.clone({ withCredentials: true })))
      );
    }
  }

  private performLogout(): void {
    this.httpClient
      .post(this.logoutUrl, {}, { withCredentials: true })
      .subscribe();
    this.router.navigate(['/login']);
  }
}
