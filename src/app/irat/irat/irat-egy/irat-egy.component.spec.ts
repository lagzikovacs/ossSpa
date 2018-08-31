import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IratEgyComponent } from './irat-egy.component';

describe('IratEgyComponent', () => {
  let component: IratEgyComponent;
  let fixture: ComponentFixture<IratEgyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IratEgyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IratEgyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
