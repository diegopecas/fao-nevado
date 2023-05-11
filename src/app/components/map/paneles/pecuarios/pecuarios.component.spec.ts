import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PecuariosComponent } from './pecuarios.component';

describe('PecuariosComponent', () => {
  let component: PecuariosComponent;
  let fixture: ComponentFixture<PecuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PecuariosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PecuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
