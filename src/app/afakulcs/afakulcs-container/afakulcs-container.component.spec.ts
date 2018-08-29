import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AfakulcsContainerComponent } from './afakulcs-container.component';

describe('AfakulcsContainerComponent', () => {
  let component: AfakulcsContainerComponent;
  let fixture: ComponentFixture<AfakulcsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AfakulcsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfakulcsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
