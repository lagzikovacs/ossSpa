import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjanlatkeresListComponent } from './ajanlatkeres-list.component';

describe('AjanlatkeresListComponent', () => {
  let component: AjanlatkeresListComponent;
  let fixture: ComponentFixture<AjanlatkeresListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjanlatkeresListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjanlatkeresListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
