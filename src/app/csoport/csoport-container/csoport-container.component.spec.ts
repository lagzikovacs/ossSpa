import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsoportContainerComponent } from './csoport-container.component';

describe('CsoportContainerComponent', () => {
  let component: CsoportContainerComponent;
  let fixture: ComponentFixture<CsoportContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsoportContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsoportContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
