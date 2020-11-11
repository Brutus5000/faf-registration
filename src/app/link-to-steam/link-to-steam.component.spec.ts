import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LinkToSteamComponent} from './link-to-steam.component';

describe('LinkToSteamComponent', () => {
  let component: LinkToSteamComponent;
  let fixture: ComponentFixture<LinkToSteamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LinkToSteamComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkToSteamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
