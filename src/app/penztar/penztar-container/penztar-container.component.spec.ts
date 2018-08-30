import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PenztarContainerComponent } from './penztar-container.component';

describe('PenztarContainerComponent', () => {
  let component: PenztarContainerComponent;
  let fixture: ComponentFixture<PenztarContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PenztarContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PenztarContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
