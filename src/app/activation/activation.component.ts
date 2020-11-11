import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'faf-activation',
  templateUrl: './activation.component.html',
  styleUrls: ['./activation.component.scss']
})
export class ActivationComponent implements OnInit {

  username: string;
  email: string;
  password: string;

  constructor(public translate: TranslateService) {
  }

  ngOnInit(): void {
  }

  onSubmit(event: any): void {

  }
}
