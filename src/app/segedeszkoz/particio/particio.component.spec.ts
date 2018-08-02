import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticioComponent } from './particio.component';

describe('ParticioComponent', () => {
  let component: ParticioComponent;
  let fixture: ComponentFixture<ParticioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
