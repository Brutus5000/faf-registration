import {Component, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';
import {I18nService} from '../i18n.service';

type ValidationResult = {
  type: 'error' | 'warn' | 'info' | 'success',
  translationKey: string,
};

@Component({
  selector: 'faf-precheck',
  templateUrl: './precheck.component.html',
  styleUrls: ['./precheck.component.scss'],
  providers: [MessageService]
})
export class PrecheckComponent implements OnInit {
  gameSource: 'notOwned' | 'steam' | 'gog' | 'retail';
  validGame = false;
  operatingSystem: 'W10x64' | 'W10x86' | 'W8x64' | 'W8x86' | 'W7x64' | 'W7x86' | 'WXP' | 'MacOS' | 'Linux';
  validOperatingSystem = false;
  resultVisible = false;
  overrideCheck = false;

  constructor(private messageService: MessageService,
              private i18nService: I18nService) {
  }

  validateGameSource(): ValidationResult[] {
    this.validGame = false;

    const results = [];
    switch (this.gameSource) {
      case 'notOwned':
      case 'gog':
        results.push({
            type: 'error',
            translationKey: 'user.registration.forms.precheck.whereBought.steam.required',
          }
        );
        break;
      case 'steam':
        results.push({
          type: 'success',
          translationKey: 'user.registration.forms.precheck.whereBought.steam.owned',
        });
        this.validGame = true;
        break;
      case 'retail':
        results.push({
          type: 'error',
          translationKey: 'user.registration.forms.precheck.whereBought.steam.required',
        });
        results.push({
          type: 'info',
          translationKey: 'user.registration.forms.precheck.whereBought.retail.steamRedeem',
        });
        break;
    }

    return results;
  }

  validateOperatingSystem(): ValidationResult[] {
    this.validOperatingSystem = false;
    const results = [];

    if (this.operatingSystem.endsWith('x64') || this.operatingSystem === 'Linux') {
      this.validOperatingSystem = true;
      results.push({
        type: 'success',
        translationKey: 'user.registration.forms.precheck.operatingSystem.supported',
      });
    } else {
      results.push({
        type: 'error',
        translationKey: 'user.registration.forms.precheck.operatingSystem.unsupported',
      });
    }

    if (
      this.operatingSystem.startsWith('W7') ||
      this.operatingSystem.startsWith('W8') ||
      this.operatingSystem.startsWith('WXP')
    ) {
      results.push({
        type: 'warn',
        translationKey: 'user.registration.forms.precheck.operatingSystem.windowsOutdated',
      });
    }

    return results;
  }

  ngOnInit(): void {
  }

  validate(): void {
    this.messageService.clear();

    const result = this.validateGameSource().concat(this.validateOperatingSystem());

    this.messageService.addAll(result.map(value => {
      return {
        severity: value.type,
        detail: this.i18nService.instant(value.translationKey),
      };
    }));

    this.resultVisible = true;
  }

}
