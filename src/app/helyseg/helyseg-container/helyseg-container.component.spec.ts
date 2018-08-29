import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelysegContainerComponent } from './helyseg-container.component';

describe('HelysegContainerComponent', () => {
  let component: HelysegContainerComponent;
  let fixture: ComponentFixture<HelysegContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelysegContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelysegContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
