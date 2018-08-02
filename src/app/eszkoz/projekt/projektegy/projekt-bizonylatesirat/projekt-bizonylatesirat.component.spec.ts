import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjektBizonylatesiratComponent } from './projekt-bizonylatesirat.component';

describe('ProjektBizonylatesiratComponent', () => {
  let component: ProjektBizonylatesiratComponent;
  let fixture: ComponentFixture<ProjektBizonylatesiratComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjektBizonylatesiratComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjektBizonylatesiratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
