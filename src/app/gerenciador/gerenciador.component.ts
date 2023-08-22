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
  timeSelecionado: Time | null = null; // Inicialize com null
  jogadores: Jogador[] = []; // Inicialize com um array vazio
  dataSource: MatTableDataSource<Jogador> = new MatTableDataSource();
  displayedColumns: string[] = [
    'posicaoJogador',
    'nomeJogador',
    'idadeJogador',
    'caracteristicaJogador',
    'valorJogador',
    'golsJogador',
    'forcaJogador',
  ];

  constructor() {}

  ngOnInit() {
    this.recuperarTimeSelecionado();
    if (this.timeSelecionado) {
      // Verifique se timeSelecionado não é null
      this.jogadores = this.timeSelecionado.jogadores; // Suponha que o time selecionado tenha a lista de jogadores
      this.dataSource = new MatTableDataSource(this.jogadores);
    }
  }

  recuperarTimeSelecionado() {
    const timeSelecionadoStr = localStorage.getItem('timeSelecionado');
    if (timeSelecionadoStr) {
      // Verifique se o valor não é null
      this.timeSelecionado = JSON.parse(timeSelecionadoStr);
    }
  }
}
