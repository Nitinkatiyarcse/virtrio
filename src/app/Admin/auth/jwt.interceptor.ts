
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHandler, HttpInterceptor, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { from, Observable, throwError, of } from 'rxjs';
import { AccountService } from '../../Services/account.service';
import { LocalStorageService } from '../../Services/local-storage.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(public accountService: AccountService, private localStorage: LocalStorageService) { }

    intercept(req: HttpRequest<any>,
        next: HttpHandler): Observable<HttpEvent<any>> {

        const idToken = this.localStorage.get('token');
        const tokenUTCExpiryTime = this.localStorage.get('TokenExpiryDate');
        if (tokenUTCExpiryTime != null) {
            if (tokenUTCExpiryTime.length > 0) {
                const tokenLocalExpiryTime = new Date(tokenUTCExpiryTime.replace('T', ' ').replace('Z', ' ') + ' UTC');
                if (tokenLocalExpiryTime > new Date()) {
                    if (idToken != null) {
                        if (idToken.length > 0) {
                            const cloned = req.clone({
                                headers: req.headers.set('Authorization',
                                    'Bearer ' + idToken)
                            });

                            return next.handle(cloned).pipe(
                                catchError((error) => {
                                    // console.log('error is intercept')
                                    // console.error(error);
                                    this.localStorage.removeAllKeys();
                                    window.location.href = 'login';
                                    return throwError(error.message);
                                })
                            );
                        } else {
                            return next.handle(req).pipe(
                                catchError((error) => {
                                    // console.log('error is intercept')
                                    // console.error(error);
                                    this.localStorage.removeAllKeys();
                                    window.location.href = 'login';
                                    return throwError(error.message);
                                })
                            );
                        }
                    } else {
                        return next.handle(req).pipe(
                            catchError((error) => {
                                // console.log('error is intercept')
                                // console.error(error);
                                this.localStorage.removeAllKeys();
                                window.location.href = 'login';
                                return throwError(error.message);
                            })
                        );
                    }
                } else {
                    this.localStorage.removeAllKeys();
                    return next.handle(req).pipe(
                        catchError((error) => {
                            // console.log('error is intercept')
                            // console.error(error);
                            this.localStorage.removeAllKeys();
                            window.location.href = 'login';
                            return throwError(error.message);
                        })
                    );
                }
            }
        }
        return next.handle(req).pipe(
            catchError((error) => {
                // console.log('error is intercept')
                // console.error(error);
                this.localStorage.removeAllKeys();
                window.location.href = 'login';
                return throwError(error.message);
            })
        );

    }
}
