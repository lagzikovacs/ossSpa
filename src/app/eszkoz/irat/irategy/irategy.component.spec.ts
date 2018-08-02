import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IrategyComponent } from './irategy.component';

describe('IrategyComponent', () => {
  let component: IrategyComponent;
  let fixture: ComponentFixture<IrategyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IrategyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IrategyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
