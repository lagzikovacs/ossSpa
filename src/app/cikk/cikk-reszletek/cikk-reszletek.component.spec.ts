import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CikkReszletekComponent } from './cikk-reszletek.component';

describe('CikkReszletekComponent', () => {
  let component: CikkReszletekComponent;
  let fixture: ComponentFixture<CikkReszletekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CikkReszletekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CikkReszletekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
