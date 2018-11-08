import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjanlatkeresReszletekComponent } from './ajanlatkeres-reszletek.component';

describe('AjanlatkeresReszletekComponent', () => {
  let component: AjanlatkeresReszletekComponent;
  let fixture: ComponentFixture<AjanlatkeresReszletekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjanlatkeresReszletekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjanlatkeresReszletekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
