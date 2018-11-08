import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjanlatkeresContainerComponent } from './ajanlatkeres-container.component';

describe('AjanlatkeresContainerComponent', () => {
  let component: AjanlatkeresContainerComponent;
  let fixture: ComponentFixture<AjanlatkeresContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjanlatkeresContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjanlatkeresContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
