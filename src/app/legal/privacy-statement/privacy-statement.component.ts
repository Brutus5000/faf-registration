import {Component, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'faf-privacy-statement',
  templateUrl: './privacy-statement.component.html',
  styleUrls: ['./privacy-statement.component.scss']
})
export class PrivacyStatementComponent implements OnInit {
  translationUrl = environment.privacyStatementTranslationUrl;

  constructor() {
  }

  ngOnInit(): void {
  }

}
