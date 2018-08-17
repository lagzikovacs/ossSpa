import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermekdijReszletekComponent } from './termekdij-reszletek.component';

describe('TermekdijReszletekComponent', () => {
  let component: TermekdijReszletekComponent;
  let fixture: ComponentFixture<TermekdijReszletekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermekdijReszletekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermekdijReszletekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
