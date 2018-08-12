import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticioSmtpComponent } from './particio-smtp.component';

describe('ParticioSmtpComponent', () => {
  let component: ParticioSmtpComponent;
  let fixture: ComponentFixture<ParticioSmtpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticioSmtpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticioSmtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
