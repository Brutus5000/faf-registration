import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {from, Observable} from 'rxjs';
import {filter, map, max, mergeMap} from 'rxjs/operators';
import {compare} from 'semver';

const githubApiProjectUrl = 'https://api.github.com/repos/FAForever/downlords-faf-client';

type GithubReleaseDto = {
  prerelease: boolean,
  tag_name: string,
  html_url: string,
  assets: GithubAssetDto[],
};

type GithubAssetDto = {
  name: string,
  browser_download_url: string,
  size: number
};

export type GithubRelease = {
  name: string,
  releaseNotesUrl: string,
  windowsDownloadUrl: string,
  linuxDownloadUrl: string,
};

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  constructor(private httpClient: HttpClient) {
  }

  getLatestReleases(): Observable<GithubRelease> {
    return this.httpClient
      .get<GithubReleaseDto[]>(`${githubApiProjectUrl}/releases`, {headers: {Accept: 'application/vnd.github.v3+json'}})
      .pipe(mergeMap(data => from(data)))
      .pipe(filter(release => !release.prerelease))
      .pipe(max<GithubReleaseDto>((x, y) => compare(x.tag_name, y.tag_name)))
      .pipe(map(release => {
        return {
          name: release.tag_name,
          releaseNotesUrl: release.html_url,
          windowsDownloadUrl: release.assets
            .filter(asset => asset.browser_download_url.endsWith('.exe'))
            .map(asset => asset.browser_download_url)[0],
          linuxDownloadUrl: release.assets
            .filter(asset => asset.browser_download_url.endsWith('.tar.gz'))
            .map(asset => asset.browser_download_url)[0],
        };
      }));
  }
}
