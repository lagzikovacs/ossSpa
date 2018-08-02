import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticioegyComponent } from './particioegy.component';

describe('ParticioegyComponent', () => {
  let component: ParticioegyComponent;
  let fixture: ComponentFixture<ParticioegyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticioegyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticioegyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
