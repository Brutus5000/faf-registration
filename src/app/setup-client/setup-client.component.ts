import {Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {I18nService} from '../i18n.service';

@Component({
  selector: 'faf-setup-client',
  templateUrl: './setup-client.component.html',
  styleUrls: ['./setup-client.component.scss']
})
export class SetupClientComponent implements OnInit {

  steps: MenuItem[] = [];
  activeIndex = 0;

  constructor(private i18nService: I18nService) {
  }

  ngOnInit(): void {
    this.i18nService.languageChanged$.subscribe(() => {
      console.log('Translations loaded');

      this.steps = [
        {
          id: 'download',
          label: 'clientSetup.headers.download'
        },
        {
          id: 'install',
          label: 'clientSetup.headers.install'
        },
        {
          id: 'login',
          label: 'clientSetup.headers.login'
        },
        {
          id: 'configure',
          label: 'clientSetup.headers.configure'
        },
        {
          id: 'play',
          label: 'clientSetup.headers.play'
        },
      ];

      this.i18nService.populateList('label', this.steps);
    });
  }
}
