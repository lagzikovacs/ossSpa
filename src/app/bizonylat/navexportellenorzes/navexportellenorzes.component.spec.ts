import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavexportellenorzesComponent } from './navexportellenorzes.component';

describe('NavexportellenorzesComponent', () => {
  let component: NavexportellenorzesComponent;
  let fixture: ComponentFixture<NavexportellenorzesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavexportellenorzesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavexportellenorzesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
