import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CikkContainerComponent } from './cikk-container.component';

describe('CikkContainerComponent', () => {
  let component: CikkContainerComponent;
  let fixture: ComponentFixture<CikkContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CikkContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CikkContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
