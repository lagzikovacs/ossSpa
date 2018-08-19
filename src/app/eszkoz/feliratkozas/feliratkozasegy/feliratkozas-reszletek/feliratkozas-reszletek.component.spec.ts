import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeliratkozasReszletekComponent } from './feliratkozas-reszletek.component';

describe('FeliratkozasReszletekComponent', () => {
  let component: FeliratkozasReszletekComponent;
  let fixture: ComponentFixture<FeliratkozasReszletekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeliratkozasReszletekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeliratkozasReszletekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
