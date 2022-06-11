import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MuestradedatosComponent } from './muestradedatos.component';

describe('MuestradedatosComponent', () => {
  let component: MuestradedatosComponent;
  let fixture: ComponentFixture<MuestradedatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MuestradedatosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MuestradedatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
