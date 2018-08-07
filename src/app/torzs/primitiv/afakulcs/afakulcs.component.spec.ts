import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AfakulcsComponent } from './afakulcs.component';

describe('AfakulcsComponent', () => {
  let component: AfakulcsComponent;
  let fixture: ComponentFixture<AfakulcsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AfakulcsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfakulcsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
