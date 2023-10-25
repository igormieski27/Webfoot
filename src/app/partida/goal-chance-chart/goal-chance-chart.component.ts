import {
  Component,
  Input,
  OnInit,
  AfterViewInit,
  DoCheck,
} from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-goal-chance-chart',
  templateUrl: './goal-chance-chart.component.html',
  styleUrls: ['./goal-chance-chart.component.css'],
})
export class GoalChanceChartComponent
  implements OnInit, AfterViewInit, DoCheck
{
  @Input() chanceDataCasa: number[] = new Array(90).fill(0); // Preenche com 90 posições
  @Input() chanceDataFora: number[] = new Array(90).fill(0); // Preenche com 90 posições
  @Input() chartColor: string = 'blue';

  private chart: Chart | null = null;

  private previousChanceDataCasa: number[] = [];
  private previousChanceDataFora: number[] = [];

  constructor() {}

  ngOnInit(): void {
    this.previousChanceDataCasa = [...this.chanceDataCasa];
    this.previousChanceDataFora = [...this.chanceDataFora];
  }

  ngDoCheck(): void {
    if (
      !this.areArraysEqual(this.chanceDataCasa, this.previousChanceDataCasa) ||
      !this.areArraysEqual(this.chanceDataFora, this.previousChanceDataFora)
    ) {
      console.log('Changes detected in chanceDataCasa or chanceDataFora');
      this.updateChart();
      this.previousChanceDataCasa = [...this.chanceDataCasa];
      this.previousChanceDataFora = [...this.chanceDataFora];
    }
  }

  ngAfterViewInit(): void {
    this.createChart();
  }

  createChart() {
    const ctx = document.getElementById('goalChanceChart') as HTMLCanvasElement;
    const chanceGeralData = this.calculateChanceGeral();

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: Array.from({ length: 90 }, (_, i) => i + 1),
        datasets: [
          {
            label: 'Chance de gol (%)',
            data: chanceGeralData,
            backgroundColor:
              this.getBackgroundColorForChanceGeral(chanceGeralData),
          },
        ],
      },
      options: {
        scales: {
          x: {
            title: {
              display: true,
              text: 'Tempo de Jogo (minutos)',
            },
          },
          y: {
            title: {
              display: true,
              text: 'Chance Geral (%)',
            },
            min: -100,
            max: 100,
          },
        },
      },
    });
  }

  updateChart() {
    if (this.chart) {
      const chanceGeralData = this.calculateChanceGeral();
      this.chart.data.datasets[0].data = chanceGeralData;
      this.chart.data.datasets[0].backgroundColor =
        this.getBackgroundColorForChanceGeral(chanceGeralData);
      this.chart.update();
    }
  }

  calculateChanceGeral(): number[] {
    const chanceGeralData = [];

    for (let i = 0; i < 90; i++) {
      const chanceCasa = this.chanceDataCasa[i];
      const chanceFora = this.chanceDataFora[i];
      let chanceGeral = chanceCasa - chanceFora;
      chanceGeralData.push(chanceGeral);
    }

    return chanceGeralData;
  }

  getBackgroundColorForChanceGeral(chanceGeralData: number[]): string[] {
    const backgroundColors = [];

    for (let i = 0; i < chanceGeralData.length; i++) {
      if (chanceGeralData[i] > 0) {
        backgroundColors.push('blue');
      } else if (chanceGeralData[i] < 0) {
        backgroundColors.push('red');
      } else {
        backgroundColors.push('gray');
      }
    }

    return backgroundColors;
  }

  private areArraysEqual(array1: number[], array2: number[]): boolean {
    if (array1.length !== array2.length) {
      return false;
    }

    for (let i = 0; i < array1.length; i++) {
      if (array1[i] !== array2[i]) {
        return false;
      }
    }

    return true;
  }
}
