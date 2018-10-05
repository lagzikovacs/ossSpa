import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbuComponent } from './abu.component';

describe('AbuComponent', () => {
  let component: AbuComponent;
  let fixture: ComponentFixture<AbuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
