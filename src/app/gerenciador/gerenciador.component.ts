import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

import { Jogador } from '../model/jogador.model';
import { Time } from '../model/time.model';
@Component({
  templateUrl: './gerenciador.component.html',
  styleUrls: ['./gerenciador.component.css'],
})
export class GerenciadorComponent implements OnInit {
  timeSelecionado: Time = new Time(); // Inicialize com null
  jogadores: Jogador[] = []; // Inicialize com um array vazio
  dataSource: MatTableDataSource<Jogador> = new MatTableDataSource();
  urlEscudo: String = '';
  displayedColumns: string[] = [
    'posicaoJogador',
    'nomeJogador',
    'idadeJogador',
    'caracteristicaJogador',
    'valorJogador',
    'golsJogador',
    'forcaJogador',
  ];
  treinador: String = '';
  jogosTime: any[] = [];
  campeonato: any[] = [];
  proximoJogo: any;
  constructor() {}

  ngOnInit() {
    this.recuperarTimeSelecionado();
    if (this.timeSelecionado) {
      // Verifique se timeSelecionado não é null
      this.urlEscudo = this.getTeamImageUrl(this.timeSelecionado.nomeTime);
      this.jogadores = this.timeSelecionado.jogadores; // Suponha que o time selecionado tenha a lista de jogadores
      this.dataSource = new MatTableDataSource(this.jogadores);
    }
    this.proximoJogo = this.jogosTime[0];
  }

  recuperarTimeSelecionado() {
    const timeSelecionadoStr = localStorage.getItem('timeSelecionado');
    if (timeSelecionadoStr) {
      // Verifique se o valor não é null
      this.timeSelecionado = JSON.parse(timeSelecionadoStr);
    }
    const jogosTime = localStorage.getItem('jogosTime');
    if (jogosTime) {
      // Verifique se o valor não é null
      this.jogosTime = JSON.parse(jogosTime);
    }
    const campeonato = localStorage.getItem('campeonato');
    if (campeonato) {
      // Verifique se o valor não é null
      this.campeonato = JSON.parse(campeonato);
    }
    const treinador = localStorage.getItem('treinador');
    if (treinador) {
      this.treinador = JSON.parse(treinador);
    }
  }

  calcularValorTotalTime(): number {
    if (this.timeSelecionado) {
      return this.jogadores.reduce(
        (total, jogador) => total + jogador.valorJogador,
        0
      );
    }
    return 0;
  }

  getTeamImageUrl(team: string): string {
    const formattedTeamName = this.removeAccents(team).replace(/ /g, '-');
    return `assets/times/${formattedTeamName}.png`;
  }

  removeAccents(input: string): string {
    return input
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
  }

  calcularValorMedioTime(): number {
    if (this.timeSelecionado && this.jogadores.length > 0) {
      return this.calcularValorTotalTime() / this.jogadores.length;
    }
    return 0;
  }

  calcularForcaMediaTime(): number {
    if (this.timeSelecionado && this.jogadores.length > 0) {
      const totalForca = this.jogadores.reduce(
        (total, jogador) => total + jogador.forcaJogador,
        0
      );
      return Math.round(totalForca / this.jogadores.length);
    }
    return 0;
  }

  calcularTotalGolsElenco(): number {
    if (this.timeSelecionado) {
      return this.jogadores.reduce(
        (total, jogador) => total + jogador.golsJogador,
        0
      );
    }
    return 0;
  }
}
