import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IratDokumentumComponent } from './irat-dokumentum.component';

describe('IratDokumentumComponent', () => {
  let component: IratDokumentumComponent;
  let fixture: ComponentFixture<IratDokumentumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IratDokumentumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IratDokumentumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
