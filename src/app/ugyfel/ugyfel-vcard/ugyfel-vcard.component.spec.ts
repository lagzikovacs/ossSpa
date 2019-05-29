import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UgyfelVcardComponent } from './ugyfel-vcard.component';

describe('UgyfelVcardComponent', () => {
  let component: UgyfelVcardComponent;
  let fixture: ComponentFixture<UgyfelVcardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UgyfelVcardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UgyfelVcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
