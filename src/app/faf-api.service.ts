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

type TranslationMapper = {
  key: string;
  argsMapper?: (args: string[]) => any;
};

@Injectable({
  providedIn: 'root'
})
export class FafApiService {

  private readonly apiErrorMapping: Map<string, TranslationMapper>;

  constructor(private http: HttpClient) {
    this.apiErrorMapping = new Map<string, TranslationMapper>();
    this.apiErrorMapping.set('130', {
      key: 'emailInvalid', argsMapper: args => {
        return {email: args[0]};
      }
    });
    this.apiErrorMapping.set('131', {
      key: 'usernameInvalid', argsMapper: args => {
        return {username: args[0]};
      }
    });
    this.apiErrorMapping.set('132', {
      key: 'usernameTaken', argsMapper: args => {
        return {username: args[0]};
      }
    });
    this.apiErrorMapping.set('133', {
      key: 'emailRegistered', argsMapper: args => {
        return {email: args[0]};
      }
    });
    this.apiErrorMapping.set('134', {key: 'emailBlacklisted'});
    this.apiErrorMapping.set('135', {key: 'tokenInvalid'});
    this.apiErrorMapping.set('136', {key: 'tokenExpired'});
    this.apiErrorMapping.set('162', {
      key: 'usernameReserved',
      argsMapper: args => {
        return {username: args[0], months: args[1]};
      }
    });
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
      error.errors.forEach(item => {
          const translationMapping = this.apiErrorMapping.get(item.code);
          let args = {};
          if (translationMapping.argsMapper) {
            args = translationMapping.argsMapper(item.meta.args);
          }

          errors.push({
            translationKey: 'fafApi.error.' + translationMapping.key,
            translationArgs: args,
          });
        }
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
