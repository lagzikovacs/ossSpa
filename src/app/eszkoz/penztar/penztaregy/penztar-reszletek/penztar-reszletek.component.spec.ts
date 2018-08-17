import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PenztarReszletekComponent } from './penztar-reszletek.component';

describe('PenztarReszletekComponent', () => {
  let component: PenztarReszletekComponent;
  let fixture: ComponentFixture<PenztarReszletekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PenztarReszletekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PenztarReszletekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
