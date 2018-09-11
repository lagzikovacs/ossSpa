import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdoszamellenorzesComponent } from './adoszamellenorzes.component';

describe('AdoszamellenorzesComponent', () => {
  let component: AdoszamellenorzesComponent;
  let fixture: ComponentFixture<AdoszamellenorzesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdoszamellenorzesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdoszamellenorzesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
