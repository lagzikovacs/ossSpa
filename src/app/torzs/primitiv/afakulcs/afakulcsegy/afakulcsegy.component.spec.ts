import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AfakulcsegyComponent } from './afakulcsegy.component';

describe('AfakulcsegyComponent', () => {
  let component: AfakulcsegyComponent;
  let fixture: ComponentFixture<AfakulcsegyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AfakulcsegyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfakulcsegyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
