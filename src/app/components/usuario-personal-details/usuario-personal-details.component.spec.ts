import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioPersonalDetailsComponent } from './usuario-personal-details.component';

describe('UsuarioPersonalDetailsComponent', () => {
  let component: UsuarioPersonalDetailsComponent;
  let fixture: ComponentFixture<UsuarioPersonalDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsuarioPersonalDetailsComponent]
    });
    fixture = TestBed.createComponent(UsuarioPersonalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
