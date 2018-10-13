import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgmComponent } from './ngm.component';

describe('NgmComponent', () => {
  let component: NgmComponent;
  let fixture: ComponentFixture<NgmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
