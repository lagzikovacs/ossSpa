import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjektBizonylatesiratContainerComponent } from './projekt-bizonylatesirat-container.component';

describe('ProjektBizonylatesiratContainerComponent', () => {
  let component: ProjektBizonylatesiratContainerComponent;
  let fixture: ComponentFixture<ProjektBizonylatesiratContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjektBizonylatesiratContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjektBizonylatesiratContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
