import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelysegReszletekComponent } from './helyseg-reszletek.component';

describe('HelysegReszletekComponent', () => {
  let component: HelysegReszletekComponent;
  let fixture: ComponentFixture<HelysegReszletekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelysegReszletekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelysegReszletekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
