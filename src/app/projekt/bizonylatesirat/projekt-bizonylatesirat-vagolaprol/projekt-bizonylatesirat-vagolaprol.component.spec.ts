import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjektBizonylatesiratVagolaprolComponent } from './projekt-bizonylatesirat-vagolaprol.component';

describe('ProjektBizonylatesiratVagolaprolComponent', () => {
  let component: ProjektBizonylatesiratVagolaprolComponent;
  let fixture: ComponentFixture<ProjektBizonylatesiratVagolaprolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjektBizonylatesiratVagolaprolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjektBizonylatesiratVagolaprolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
