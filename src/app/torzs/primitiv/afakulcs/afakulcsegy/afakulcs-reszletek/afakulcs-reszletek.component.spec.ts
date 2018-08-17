import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AfakulcsReszletekComponent } from './afakulcs-reszletek.component';

describe('AfakulcsReszletekComponent', () => {
  let component: AfakulcsReszletekComponent;
  let fixture: ComponentFixture<AfakulcsReszletekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AfakulcsReszletekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfakulcsReszletekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
