import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UgyfelTerBizonylatesiratListComponent } from './ugyfel-ter-bizonylatesirat-list.component';

describe('UgyfelTerBizonylatesiratListComponent', () => {
  let component: UgyfelTerBizonylatesiratListComponent;
  let fixture: ComponentFixture<UgyfelTerBizonylatesiratListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UgyfelTerBizonylatesiratListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UgyfelTerBizonylatesiratListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
