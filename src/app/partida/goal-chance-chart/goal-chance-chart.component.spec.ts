import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalChanceChartComponent } from './goal-chance-chart.component';

describe('GoalChanceChartComponent', () => {
  let component: GoalChanceChartComponent;
  let fixture: ComponentFixture<GoalChanceChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GoalChanceChartComponent]
    });
    fixture = TestBed.createComponent(GoalChanceChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
