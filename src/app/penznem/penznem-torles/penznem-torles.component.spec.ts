import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PenznemTorlesComponent } from './penznem-torles.component';

describe('PenznemTorlesComponent', () => {
  let component: PenznemTorlesComponent;
  let fixture: ComponentFixture<PenznemTorlesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PenznemTorlesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PenznemTorlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
