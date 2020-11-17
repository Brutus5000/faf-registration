import {Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {I18nService} from '../i18n.service';
import {Observable} from 'rxjs';
import {GithubRelease, GithubService} from '../github.service';
import {Router} from '@angular/router';

@Component({
  selector: 'faf-setup-client',
  templateUrl: './setup-client.component.html',
  styleUrls: ['./setup-client.component.scss']
})
export class SetupClientComponent implements OnInit {

  steps: MenuItem[] = [];
  latestRelease$: Observable<GithubRelease>;
  activeIndex = 0;

  constructor(public router: Router,
              private i18nService: I18nService,
              private githubService: GithubService) {
    this.latestRelease$ = githubService.getLatestReleases();
  }

  ngOnInit(): void {
    this.i18nService.languageChanged$.subscribe(() => {
      console.log('Translations loaded');

      this.steps = [
        {
          id: 'download',
          label: 'clientSetup.headers.download',
          routerLink: 'download'
        },
        {
          id: 'install',
          label: 'clientSetup.headers.install',
          routerLink: 'install'
        },
        {
          id: 'login',
          label: 'clientSetup.headers.login',
          routerLink: 'login'
        },
        {
          id: 'configure',
          label: 'clientSetup.headers.configure',
          routerLink: 'configure'
        },
        {
          id: 'play',
          label: 'clientSetup.headers.play',
          routerLink: 'play'
        },
      ];

      this.i18nService.populateList('label', this.steps);
    });
  }
}
