import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BizonylatKibocsatasComponent } from './bizonylat-kibocsatas.component';

describe('BizonylatKibocsatasComponent', () => {
  let component: BizonylatKibocsatasComponent;
  let fixture: ComponentFixture<BizonylatKibocsatasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BizonylatKibocsatasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BizonylatKibocsatasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
