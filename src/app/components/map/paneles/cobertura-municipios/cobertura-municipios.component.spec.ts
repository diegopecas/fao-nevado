import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoberturaMunicipiosComponent } from './cobertura-municipios.component';

describe('CoberturaMunicipiosComponent', () => {
  let component: CoberturaMunicipiosComponent;
  let fixture: ComponentFixture<CoberturaMunicipiosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoberturaMunicipiosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoberturaMunicipiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
