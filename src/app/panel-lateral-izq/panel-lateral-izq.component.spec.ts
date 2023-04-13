import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelLateralIzqComponent } from './panel-lateral-izq.component';

describe('PanelLateralIzqComponent', () => {
  let component: PanelLateralIzqComponent;
  let fixture: ComponentFixture<PanelLateralIzqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelLateralIzqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelLateralIzqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
