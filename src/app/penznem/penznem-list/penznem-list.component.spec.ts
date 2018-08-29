import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PenznemListComponent } from './penznem-list.component';

describe('PenznemListComponent', () => {
  let component: PenznemListComponent;
  let fixture: ComponentFixture<PenznemListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PenznemListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PenznemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
