import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermekdijSzerkesztesComponent } from './termekdij-szerkesztes.component';

describe('TermekdijSzerkesztesComponent', () => {
  let component: TermekdijSzerkesztesComponent;
  let fixture: ComponentFixture<TermekdijSzerkesztesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermekdijSzerkesztesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermekdijSzerkesztesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
