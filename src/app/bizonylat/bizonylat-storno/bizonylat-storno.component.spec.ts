import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BizonylatStornoComponent } from './bizonylat-storno.component';

describe('BizonylatStornoComponent', () => {
  let component: BizonylatStornoComponent;
  let fixture: ComponentFixture<BizonylatStornoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BizonylatStornoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BizonylatStornoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
