import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjektBizonylatesiratListComponent } from './projekt-bizonylatesirat-list.component';

describe('ProjektBizonylatesiratListComponent', () => {
  let component: ProjektBizonylatesiratListComponent;
  let fixture: ComponentFixture<ProjektBizonylatesiratListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjektBizonylatesiratListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjektBizonylatesiratListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
