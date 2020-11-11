import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'faf-link-to-steam',
  templateUrl: './link-to-steam.component.html',
  styleUrls: ['./link-to-steam.component.scss']
})
export class LinkToSteamComponent implements OnInit {

  username: string;
  password: string;

  constructor() {
  }

  ngOnInit(): void {
  }

  onSubmit(event: any): void {

  }
}
