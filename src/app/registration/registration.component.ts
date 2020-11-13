import {Component} from '@angular/core';
import {Subject} from 'rxjs';
import {debounceTime, switchMap} from 'rxjs/operators';
import {FafApiService} from '../faf-api.service';
import {environment} from '../../environments/environment';
import {MessageService} from 'primeng/api';
import {I18nService} from '../i18n.service';

@Component({
  selector: 'faf-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  providers: [MessageService]
})
export class RegistrationComponent {
  recaptchaSiteKey = environment.recaptchaSiteKey;

  registrationComplete = false;
  usernameChanged = new Subject<string>();
  usernameTaken$ = this.usernameChanged.asObservable()
    .pipe(debounceTime(1000))
    .pipe(switchMap(value => this.fafApiService.checkUsernameTaken(value)));

  username: string;
  email: string;
  acceptedOwnsSteam: boolean;
  acceptedTos: boolean;
  acceptedPrivacyStatement: boolean;

  constructor(private i18nService: I18nService,
              private fafApiService: FafApiService,
              private messageService: MessageService) {
  }

  onSubmit(event: any): void {
    this.fafApiService.registerAccount(this.username, this.email)
      .subscribe({
          next: result => {
            this.messageService.add({
              severity: 'success',
              summary: this.i18nService.instant('user.registration.success.summary'),
              detail: this.i18nService.instant('user.registration.success.nextSteps', {email: this.email}),
            });
            this.registrationComplete = true;
          },
          error: err => this.messageService.add({
            severity: 'error',
            summary: this.i18nService.instant('user.registration.error.summary'),
            detail: JSON.stringify(err.error),
          }),
        }
      );
  }
}
