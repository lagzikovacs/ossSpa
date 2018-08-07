import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeTorlesComponent } from './me-torles.component';

describe('MeTorlesComponent', () => {
  let component: MeTorlesComponent;
  let fixture: ComponentFixture<MeTorlesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeTorlesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeTorlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
