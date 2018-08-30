import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeliratkozasListComponent } from './feliratkozas-list.component';

describe('FeliratkozasListComponent', () => {
  let component: FeliratkozasListComponent;
  let fixture: ComponentFixture<FeliratkozasListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeliratkozasListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeliratkozasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
