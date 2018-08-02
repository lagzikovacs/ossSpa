import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeliratkozasComponent } from './feliratkozas.component';

describe('FeliratkozasComponent', () => {
  let component: FeliratkozasComponent;
  let fixture: ComponentFixture<FeliratkozasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeliratkozasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeliratkozasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
