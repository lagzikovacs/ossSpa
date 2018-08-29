import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeContainerComponent } from './me-container.component';

describe('MeContainerComponent', () => {
  let component: MeContainerComponent;
  let fixture: ComponentFixture<MeContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
