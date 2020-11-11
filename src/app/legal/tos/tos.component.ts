import {Component, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'faf-tos',
  templateUrl: './tos.component.html',
  styleUrls: ['./tos.component.scss']
})
export class TosComponent implements OnInit {
  translationUrl = environment.tosTranslationUrl;

  constructor() {
  }

  ngOnInit(): void {
  }

}
