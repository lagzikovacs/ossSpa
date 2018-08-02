import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelysegTorlesComponent } from './helyseg-torles.component';

describe('HelysegTorlesComponent', () => {
  let component: HelysegTorlesComponent;
  let fixture: ComponentFixture<HelysegTorlesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelysegTorlesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelysegTorlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
