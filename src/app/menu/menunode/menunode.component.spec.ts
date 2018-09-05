import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenunodeComponent } from './menunode.component';

describe('MenunodeComponent', () => {
  let component: MenunodeComponent;
  let fixture: ComponentFixture<MenunodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenunodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenunodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
