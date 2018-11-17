import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavfeltoltesellenorzeseComponent } from './navfeltoltesellenorzese.component';

describe('NavfeltoltesellenorzeseComponent', () => {
  let component: NavfeltoltesellenorzeseComponent;
  let fixture: ComponentFixture<NavfeltoltesellenorzeseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavfeltoltesellenorzeseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavfeltoltesellenorzeseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
