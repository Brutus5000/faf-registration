import {Component, Input, OnInit} from '@angular/core';
import {OperatingSystem} from '../setup-client.component';

@Component({
  selector: 'faf-setup-install',
  templateUrl: './install.component.html',
  styleUrls: ['./install.component.scss']
})
export class InstallComponent implements OnInit {
  @Input()
  operatingSystem: OperatingSystem;

  constructor() {
  }

  ngOnInit(): void {
  }

}
