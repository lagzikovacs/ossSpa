import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BizonylatteteltablaComponent } from './bizonylatteteltabla.component';

describe('BizonylatteteltablaComponent', () => {
  let component: BizonylatteteltablaComponent;
  let fixture: ComponentFixture<BizonylatteteltablaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BizonylatteteltablaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BizonylatteteltablaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
