import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OdcComponent } from './odc.component';

describe('OdcComponent', () => {
  let component: OdcComponent;
  let fixture: ComponentFixture<OdcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OdcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OdcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
