import {Component, OnDestroy, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {I18nService} from './i18n.service';
import {Subscription} from 'rxjs';

interface Language {
  name: string;
  code: string;
}

@Component({
  selector: 'faf-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private i18nService: I18nService) {
  }

  activeIndex = 0;
  changeLanguageSubscription: Subscription;

  languages: Language[];

  steps: MenuItem[] = [{id: 'loading', label: 'Loading'}];

  selectedLanguage: Language;
  validate = false;

  title = 'faf-registration';

  activeStep = () => this.steps[this.activeIndex];

  onLangChange(newLanguage: Language): void {
    this.i18nService.changeLanguage(newLanguage);
  }

  ngOnInit(): void {
    this.languages = this.i18nService.languages;
    this.changeLanguageSubscription = this.i18nService.languageChanged$
      .subscribe(() => this.buildMenuTranslations());
  }

  ngOnDestroy(): void {
    this.changeLanguageSubscription.unsubscribe();
  }

  private buildMenuTranslations(): void {
    this.steps = [
      {
        id: 'registration',
        label: 'user.registration.headers.registration',
        command: (event: any) => {
          this.activeIndex = 0;
        }
      },
      {
        id: 'activation',
        label: 'user.registration.headers.activation',
        command: (event: any) => {
          this.activeIndex = 1;
        }
      },
      {
        id: 'steamLink',
        label: 'user.registration.headers.steamLink',
        command: (event: any) => {
          this.activeIndex = 2;
        }
      },
      {
        id: 'fafClientSetup',
        label: this.i18nService.instant('user.registration.headers.fafClientSetup'),
        command: (event: any) => {
          this.activeIndex = 3;
        }
      },
    ];

    this.i18nService.populateList('label', this.steps);
  }
}
