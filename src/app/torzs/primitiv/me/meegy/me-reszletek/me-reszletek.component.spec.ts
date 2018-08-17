import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeReszletekComponent } from './me-reszletek.component';

describe('MeReszletekComponent', () => {
  let component: MeReszletekComponent;
  let fixture: ComponentFixture<MeReszletekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeReszletekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeReszletekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
