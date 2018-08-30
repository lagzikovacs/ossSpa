import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IratReszletekComponent } from './irat-reszletek.component';

describe('IratReszletekComponent', () => {
  let component: IratReszletekComponent;
  let fixture: ComponentFixture<IratReszletekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IratReszletekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IratReszletekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
