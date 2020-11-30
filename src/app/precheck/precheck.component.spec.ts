import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PrecheckComponent} from './precheck.component';

describe('PrecheckComponent', () => {
  let component: PrecheckComponent;
  let fixture: ComponentFixture<PrecheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrecheckComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrecheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
