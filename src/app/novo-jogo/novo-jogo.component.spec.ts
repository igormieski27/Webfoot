import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovoJogoComponent } from './novo-jogo.component';

describe('NovoJogoComponent', () => {
  let component: NovoJogoComponent;
  let fixture: ComponentFixture<NovoJogoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NovoJogoComponent]
    });
    fixture = TestBed.createComponent(NovoJogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
