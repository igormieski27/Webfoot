import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportacaoJsonComponent } from './importacao-json.component';

describe('ImportacaoJsonComponent', () => {
  let component: ImportacaoJsonComponent;
  let fixture: ComponentFixture<ImportacaoJsonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImportacaoJsonComponent]
    });
    fixture = TestBed.createComponent(ImportacaoJsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
