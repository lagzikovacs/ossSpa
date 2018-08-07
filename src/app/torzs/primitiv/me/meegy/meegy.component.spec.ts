import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeegyComponent } from './meegy.component';

describe('MeegyComponent', () => {
  let component: MeegyComponent;
  let fixture: ComponentFixture<MeegyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeegyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeegyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
