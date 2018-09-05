import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SzerepkorvalasztasComponent } from './szerepkorvalasztas.component';

describe('SzerepkorvalasztasComponent', () => {
  let component: SzerepkorvalasztasComponent;
  let fixture: ComponentFixture<SzerepkorvalasztasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SzerepkorvalasztasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SzerepkorvalasztasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
