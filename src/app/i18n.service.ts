import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {BehaviorSubject} from 'rxjs';

export interface Language {
  name: string;
  code: string;
}

@Injectable({
  providedIn: 'root'
})
export class I18nService {

  private languageChangedSubject = new BehaviorSubject<Language>(null);

  languageChanged$ = this.languageChangedSubject.asObservable();

  languages: Language[] = [
    {
      name: 'English',
      code: 'en',
    },
    {
      name: 'Deutsch',
      code: 'de',
    }
  ];

  constructor(private translateService: TranslateService) {
    translateService.addLangs(this.languages.map(lang => lang.code));
    translateService.use(translateService.getBrowserLang() || 'en')
      .subscribe(() => this.languageChangedSubject.next(this.getCurrentLanguage()));
  }

  /**
   * Returns a translation instantly from the internal state of loaded translation.
   * All rules regarding the current language, the preferred language of even fallback languages will be used except any promise handling.
   */
  instant(key: string | Array<string>, interpolateParams?: any): any {
    return this.translateService.instant(key, interpolateParams);
  }

  /**
   * Populate a list of similar objects and replace the translation keys with their actual translations.
   * @param field that must contain an translation key and will be replaced with actual translation
   * @param elements list of elements that will be populated
   */
  populateList<T>(field: string, elements: T[]): void {
    elements.forEach(element => {
      const translationKey = element[field];
      element[field] = this.instant(translationKey);
    });
  }

  changeLanguage(language: Language): void {
    this.translateService.use(language.code)
      .subscribe(() => {
        console.log(`Language changed to: ${language.code}`);
        this.languageChangedSubject.next(language);
      });
  }

  getCurrentLanguage(): Language {
    return this.languages
      .filter(lang => lang.code === this.translateService.currentLang)[0];
  }
}
