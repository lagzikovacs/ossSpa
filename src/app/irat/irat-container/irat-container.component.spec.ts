import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IratContainerComponent } from './irat-container.component';

describe('IratContainerComponent', () => {
  let component: IratContainerComponent;
  let fixture: ComponentFixture<IratContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IratContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IratContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
