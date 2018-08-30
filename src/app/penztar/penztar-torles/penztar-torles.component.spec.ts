import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PenztarTorlesComponent } from './penztar-torles.component';

describe('PenztarTorlesComponent', () => {
  let component: PenztarTorlesComponent;
  let fixture: ComponentFixture<PenztarTorlesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PenztarTorlesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PenztarTorlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
