import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import jwtDecode from 'jwt-decode';

interface RegistrationToken {
  action: string;
  username: string;
  email: string;
}

@Component({
  selector: 'faf-activation',
  templateUrl: './activation.component.html',
  styleUrls: ['./activation.component.scss']
})
export class ActivationComponent implements OnInit {

  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
  hasToken$: Observable<boolean>;
  validToken = true;

  constructor(private activatedRoute: ActivatedRoute) {
    this.hasToken$ = activatedRoute.queryParamMap
      .pipe(map(queryParamMap => queryParamMap.has('token')));

    activatedRoute.queryParamMap
      .pipe(filter(queryParamMap => queryParamMap.has('token')))
      .pipe(map(queryParamMap => queryParamMap.get('token')))
      .subscribe(encodedToken => {
        try {
          const token = jwtDecode(encodedToken) as RegistrationToken;
          this.username = token.username;
          this.email = token.email;
          this.validToken = true;
        } catch (err) {
          this.username = undefined;
          this.email = undefined;
          this.validToken = false;
        }
      });
  }

  ngOnInit(): void {
  }

  onSubmit(event: any): void {
  }
}
