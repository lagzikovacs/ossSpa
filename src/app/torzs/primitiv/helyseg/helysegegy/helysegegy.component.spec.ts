import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelysegegyComponent } from './helysegegy.component';

describe('HelysegegyComponent', () => {
  let component: HelysegegyComponent;
  let fixture: ComponentFixture<HelysegegyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelysegegyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelysegegyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
