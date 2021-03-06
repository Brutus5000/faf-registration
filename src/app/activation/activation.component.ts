import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {filter, map} from 'rxjs/operators';
import jwtDecode from 'jwt-decode';
import {ApiError, FafApiService} from '../faf-api.service';
import {MessageService} from 'primeng/api';
import {I18nService} from '../i18n.service';

interface RegistrationToken {
  action: string;
  username: string;
  email: string;
  lifetime: Date;
}

@Component({
  selector: 'faf-activation',
  templateUrl: './activation.component.html',
  styleUrls: ['./activation.component.scss'],
  providers: [MessageService]
})
export class ActivationComponent implements OnInit {
  activationComplete = false;
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
  token: string;
  tokenExpired: boolean;
  validToken = true;

  constructor(private activatedRoute: ActivatedRoute,
              private i18nService: I18nService,
              private fafApiService: FafApiService,
              private messageService: MessageService) {
    activatedRoute.queryParamMap
      .pipe(filter(queryParamMap => queryParamMap.has('token')))
      .pipe(map(queryParamMap => queryParamMap.get('token')))
      .subscribe(encodedToken => {
        try {
          this.token = encodedToken;
          const token = jwtDecode(encodedToken) as RegistrationToken;
          this.username = token.username;
          this.email = token.email;
          this.tokenExpired = new Date(token.lifetime) < new Date();
          this.validToken = true;
        } catch (err) {
          this.username = undefined;
          this.email = undefined;
          this.validToken = false;
          this.tokenExpired = undefined;
        }
      });
  }

  ngOnInit(): void {
  }

  onSubmit(event: any): void {
    this.fafApiService.activateAccount(this.token, this.password)
      .subscribe({
          next: result => {
            this.messageService.add({
              severity: 'success',
              summary: this.i18nService.instant('user.registration.forms.activation.success.summary'),
              detail: this.i18nService.instant('user.registration.forms.activation.success.nextSteps', {email: this.email}),
            });
            this.activationComplete = true;
          },
          error: (err: ApiError[]) => {
            err.forEach(e => this.messageService.add({
              severity: 'error',
              summary: this.i18nService.instant('user.registration.forms.activation.error.summary'),
              detail: this.i18nService.instant(e.translationKey, e.translationArgs),
            }));
          },
        }
      );
  }
}
