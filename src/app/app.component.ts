import {Component, OnDestroy, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {I18nService} from './i18n.service';
import {Subscription} from 'rxjs';
import {Location} from '@angular/common';

interface Language {
  name: string;
  code: string;
}

@Component({
  selector: 'faf-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [Location]
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
        routerLink: '/registration',
      },
      {
        id: 'activation',
        label: 'user.registration.headers.activation',
        routerLink: '/activation',
      },
      {
        id: 'steamLink',
        label: 'user.registration.headers.steamLink',
        routerLink: 'linkToSteam',
      },
      {
        id: 'fafClientSetup',
        label: 'user.registration.headers.fafClientSetup',
        routerLink: 'setupFafClient',
      },
    ];

    this.i18nService.populateList('label', this.steps);
  }
}
