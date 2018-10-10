import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UgyfelTerLinkComponent } from './ugyfel-ter-link.component';

describe('UgyfelTerLinkComponent', () => {
  let component: UgyfelTerLinkComponent;
  let fixture: ComponentFixture<UgyfelTerLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UgyfelTerLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UgyfelTerLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
