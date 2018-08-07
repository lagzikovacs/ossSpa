import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CikkegyComponent } from './cikkegy.component';

describe('CikkegyComponent', () => {
  let component: CikkegyComponent;
  let fixture: ComponentFixture<CikkegyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CikkegyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CikkegyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
