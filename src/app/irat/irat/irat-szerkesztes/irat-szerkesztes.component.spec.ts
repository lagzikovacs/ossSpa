import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IratSzerkesztesComponent } from './irat-szerkesztes.component';

describe('IratSzerkesztesComponent', () => {
  let component: IratSzerkesztesComponent;
  let fixture: ComponentFixture<IratSzerkesztesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IratSzerkesztesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IratSzerkesztesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
