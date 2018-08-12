import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticioNavComponent } from './particio-nav.component';

describe('ParticioNavComponent', () => {
  let component: ParticioNavComponent;
  let fixture: ComponentFixture<ParticioNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticioNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticioNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
