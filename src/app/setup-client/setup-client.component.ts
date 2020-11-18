import {Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {I18nService} from '../i18n.service';
import {ActivatedRoute, Router} from '@angular/router';

export type OperatingSystem = 'windows' | 'linux';

@Component({
  selector: 'faf-setup-client',
  templateUrl: './setup-client.component.html',
  styleUrls: ['./setup-client.component.scss']
})
export class SetupClientComponent implements OnInit {

  steps: MenuItem[] = [];
  operatingSystem: OperatingSystem;

  constructor(public router: Router,
              public activatedRoute: ActivatedRoute,
              private i18nService: I18nService,
  ) {
  }

  ngOnInit(): void {
    this.i18nService.languageChanged$.subscribe(() => {
      this.steps = [
        {
          id: 'download',
          label: 'clientSetup.headers.download',
          routerLink: '../download'
        },
        {
          id: 'install',
          label: 'clientSetup.headers.install',
          routerLink: '../install'
        },
        {
          id: 'login',
          label: 'clientSetup.headers.login',
          routerLink: '../login'
        },
        {
          id: 'configure',
          label: 'clientSetup.headers.configure',
          routerLink: '../configure'
        },
        {
          id: 'play',
          label: 'clientSetup.headers.play',
          routerLink: '../play'
        },
      ];

      this.i18nService.populateList('label', this.steps);
    });
  }
}
