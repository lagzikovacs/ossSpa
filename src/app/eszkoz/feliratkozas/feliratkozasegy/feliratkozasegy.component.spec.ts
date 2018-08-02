import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeliratkozasegyComponent } from './feliratkozasegy.component';

describe('FeliratkozasegyComponent', () => {
  let component: FeliratkozasegyComponent;
  let fixture: ComponentFixture<FeliratkozasegyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeliratkozasegyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeliratkozasegyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
