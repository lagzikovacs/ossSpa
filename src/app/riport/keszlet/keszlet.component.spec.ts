import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeszletComponent } from './keszlet.component';

describe('KeszletComponent', () => {
  let component: KeszletComponent;
  let fixture: ComponentFixture<KeszletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeszletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeszletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
