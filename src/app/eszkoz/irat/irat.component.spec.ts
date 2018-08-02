import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IratComponent } from './irat.component';

describe('IratComponent', () => {
  let component: IratComponent;
  let fixture: ComponentFixture<IratComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IratComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
