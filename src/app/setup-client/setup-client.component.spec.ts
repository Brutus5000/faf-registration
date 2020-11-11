import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SetupClientComponent} from './setup-client.component';

describe('SetupClientComponent', () => {
  let component: SetupClientComponent;
  let fixture: ComponentFixture<SetupClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SetupClientComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
