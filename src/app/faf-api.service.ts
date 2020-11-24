import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {environment} from '../environments/environment';
import {catchError, map} from 'rxjs/operators';

type Username = string;
type Email = string;

export type ApiError = {
  translationKey: string;
  translationArgs: object;
};

type ApiErrorItem = {
  status: string;
  title: string;
  detail: string;
  code: string;
  meta: {
    args: any[];
  };
};

type ApiErrorResponse = {
  requestId: string;
  errors: ApiErrorItem[];
};


@Injectable({
  providedIn: 'root'
})
export class FafApiService {

  private readonly apiErrorMapping: Map<string, string>;

  constructor(private http: HttpClient) {
    this.apiErrorMapping = new Map<string, string>();
    this.apiErrorMapping.set('130', 'emailInvalid');
    this.apiErrorMapping.set('131', 'usernameInvalid');
    this.apiErrorMapping.set('132', 'usernameTaken');
    this.apiErrorMapping.set('133', 'emailRegistered');
    this.apiErrorMapping.set('134', 'emailBlacklisted');
    this.apiErrorMapping.set('135', 'tokenInvalid');
    this.apiErrorMapping.set('136', 'tokenExpired');
  }

  registerAccount(username: Username, email: Email): Observable<any> {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);

    return this.http.post(`${environment.fafApiUrl}/users/register`, formData)
      .pipe(catchError(e => this.remapErrors(e)));
  }

  activateAccount(activationToken: string, password: string): Observable<any> {
    const formData = new FormData();
    formData.append('token', activationToken);
    formData.append('password', password);

    return this.http.post(`${environment.fafApiUrl}/users/activate`, formData)
      .pipe(catchError(e => this.remapErrors(e)));
  }

  checkUsernameTaken(username: Username): Observable<boolean> {
    return this.http.get(`${environment.fafApiUrl}/data/player?filter=login=="${username}"`)
      .pipe(map((response: any) => response.data.length > 0))
      .pipe(catchError(e => this.remapErrors(e)));
  }

  remapErrors(err: any): Observable<never> {
    const errors: ApiError[] = [];

    if (err.status === 0) {
      errors.push({
        translationKey: 'common.serviceUnavailable',
        translationArgs: {url: environment.fafApiUrl},
      });
    } else if (err.status >= 400) {
      const error = err.error as ApiErrorResponse;
      error.errors.forEach(item =>
        errors.push({
          translationKey: 'fafApi.error.' + this.apiErrorMapping.get(item.code),
          translationArgs: item.meta.args,
        })
      );
    } else {
      // This shouldn't happen.
      errors.push({
        translationKey: 'common.unknownError',
        translationArgs: {},
      });
    }

    return throwError(errors);
  }
}
