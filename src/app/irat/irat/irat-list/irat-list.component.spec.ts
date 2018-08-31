import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IratListComponent } from './irat-list.component';

describe('IratListComponent', () => {
  let component: IratListComponent;
  let fixture: ComponentFixture<IratListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IratListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IratListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
