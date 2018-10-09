import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjanlatTetelComponent } from './ajanlat-tetel';

describe('AjanlatTetelComponent', () => {
  let component: AjanlatTetelComponent;
  let fixture: ComponentFixture<AjanlatTetelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjanlatTetelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjanlatTetelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
