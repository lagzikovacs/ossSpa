import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AfakulcsListComponent } from './afakulcs-list.component';

describe('AfakulcsListComponent', () => {
  let component: AfakulcsListComponent;
  let fixture: ComponentFixture<AfakulcsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AfakulcsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfakulcsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
