import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeListComponent } from './me-list.component';

describe('MeListComponent', () => {
  let component: MeListComponent;
  let fixture: ComponentFixture<MeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
