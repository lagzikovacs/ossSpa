import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjektBizonylatesiratUjiratComponent } from './projekt-bizonylatesirat-ujirat.component';

describe('ProjektBizonylatesiratUjiratComponent', () => {
  let component: ProjektBizonylatesiratUjiratComponent;
  let fixture: ComponentFixture<ProjektBizonylatesiratUjiratComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjektBizonylatesiratUjiratComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjektBizonylatesiratUjiratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
