import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FotozasComponent } from './fotozas.component';

describe('FotozasComponent', () => {
  let component: FotozasComponent;
  let fixture: ComponentFixture<FotozasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FotozasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FotozasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
