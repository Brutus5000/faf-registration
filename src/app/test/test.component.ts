import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'faf-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  @Input()
  value: string;

  @Output()
  valueClicked = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit(): void {
  }

  onClicked(): void {
    this.valueClicked.emit('12345');
  }
}
