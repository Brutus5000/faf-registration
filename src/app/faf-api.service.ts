import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../environments/environment';
import {map} from 'rxjs/operators';

type Username = string;
type Email = string;

@Injectable({
  providedIn: 'root'
})
export class FafApiService {

  constructor(private http: HttpClient) {
  }

  register(username: Username, email: Email): Observable<any> {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);

    return this.http.post(`${environment.fafApiUrl}/users/register`, formData);
  }

  checkUsernameTaken(username: Username): Observable<boolean> {
    return this.http.get(`${environment.fafApiUrl}/data/player?filter=login=="${username}"`)
      .pipe(map((response: any) => response.data.length > 0));
  }
}
