import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {I18nService} from '../i18n.service';
import {FafApiService} from '../faf-api.service';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'faf-link-to-steam',
  templateUrl: './link-to-steam.component.html',
  styleUrls: ['./link-to-steam.component.scss'],
  providers: [MessageService]
})
export class LinkToSteamComponent implements OnInit {

  username: string;
  password: string;
  result?: string;


  constructor(private activatedRoute: ActivatedRoute,
              private i18nService: I18nService,
              private fafApiService: FafApiService,
              private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.result = this.activatedRoute.snapshot.queryParamMap.get('result');

  }

  onSubmit(event: any): void {
  }
}
