import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RellenodedatosComponent } from './rellenodedatos.component';

describe('RellenodedatosComponent', () => {
  let component: RellenodedatosComponent;
  let fixture: ComponentFixture<RellenodedatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RellenodedatosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RellenodedatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
