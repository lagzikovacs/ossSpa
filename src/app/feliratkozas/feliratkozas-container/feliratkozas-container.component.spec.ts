import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeliratkozasContainerComponent } from './feliratkozas-container.component';

describe('FeliratkozasContainerComponent', () => {
  let component: FeliratkozasContainerComponent;
  let fixture: ComponentFixture<FeliratkozasContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeliratkozasContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeliratkozasContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
