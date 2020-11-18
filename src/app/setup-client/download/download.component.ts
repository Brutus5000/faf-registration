import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {GithubRelease, GithubService} from '../../github.service';
import {OperatingSystem} from '../setup-client.component';

@Component({
  selector: 'faf-setup-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss']
})
export class DownloadComponent implements OnInit {

  @Output()
  operatingSystem = new EventEmitter<'windows' | 'linux'>();

  latestRelease$: Observable<GithubRelease>;

  constructor(private githubService: GithubService) {
    this.latestRelease$ = githubService.getLatestReleases();
  }

  ngOnInit(): void {
  }

  selectOperatingSystem(os: OperatingSystem): void {
    this.operatingSystem.emit(os);
  }
}
