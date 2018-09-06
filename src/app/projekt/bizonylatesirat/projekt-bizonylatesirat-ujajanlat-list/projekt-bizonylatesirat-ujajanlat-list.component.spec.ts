import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjektBizonylatesiratUjajanlatListComponent } from './projekt-bizonylatesirat-ujajanlat-list.component';

describe('ProjektBizonylatesiratUjajanlatListComponent', () => {
  let component: ProjektBizonylatesiratUjajanlatListComponent;
  let fixture: ComponentFixture<ProjektBizonylatesiratUjajanlatListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjektBizonylatesiratUjajanlatListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjektBizonylatesiratUjajanlatListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
