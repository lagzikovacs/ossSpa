import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjektBizonylatesiratUjbizonylatComponent } from './projekt-bizonylatesirat-ujbizonylat.component';

describe('ProjektBizonylatesiratUjbizonylatComponent', () => {
  let component: ProjektBizonylatesiratUjbizonylatComponent;
  let fixture: ComponentFixture<ProjektBizonylatesiratUjbizonylatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjektBizonylatesiratUjbizonylatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjektBizonylatesiratUjbizonylatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
