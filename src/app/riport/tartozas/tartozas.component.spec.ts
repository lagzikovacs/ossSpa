import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TartozasComponent } from './tartozas.component';

describe('TartozasComponent', () => {
  let component: TartozasComponent;
  let fixture: ComponentFixture<TartozasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TartozasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TartozasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
