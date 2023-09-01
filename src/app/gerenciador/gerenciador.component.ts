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
  prePartida: boolean = false;
  displayedColumns: string[] = [
    'posicao',
    'nome',
    'pePreferido',
    'idade',
    'altura',
    'valorDeMercado',
    'forca',
  ];

  displayedColumnsPrePartida: string[] = [
    'selecionado',
    'posicao',
    'nome',
    'pePreferido',
    'forca',
  ];
  treinador: String = '';
  jogosTime: any[] = [];
  campeonato: any[] = [];
  proximoJogo: any;
  taticaJogo: String = 'Equilibrado';
  taticas: any[] = ['Equilibrado', 'Ataque Total', 'Contra-Ataque'];
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

  iniciarJogo() {
    this.prePartida = true;
  }

  toggleSelectAll() {
    for (const jogador of this.jogadores) {
      jogador.selecionado = !jogador.selecionado;
    }
  }

  escalarTime(jogadores: Jogador[]): Jogador[] {
    const goleiros = jogadores.filter(
      (jogador) => jogador.posicao === 'Goleiro'
    );
    const zagueiros = jogadores.filter(
      (jogador) => jogador.posicao === 'Zagueiro'
    );
    const laterais = jogadores.filter(
      (jogador) =>
        jogador.posicao === 'Lateral Esq.' || jogador.posicao === 'Lateral Dir.'
    );
    const volantes = jogadores.filter(
      (jogador) => jogador.posicao === 'Volante'
    );
    const meiasCentrais = jogadores.filter(
      (jogador) => jogador.posicao === 'Meia Central'
    );
    const meiasOfensivos = jogadores.filter(
      (jogador) => jogador.posicao === 'Meia Ofensivo'
    );
    const pontasEsquerdas = jogadores.filter(
      (jogador) => jogador.posicao === 'Ponta Esquerda'
    );
    const pontasDireitas = jogadores.filter(
      (jogador) => jogador.posicao === 'Ponta Direita'
    );
    const centroavantes = jogadores.filter(
      (jogador) => jogador.posicao === 'Centroavante'
    );

    function sortByForca(a: Jogador, b: Jogador): number {
      return b.forcaJogador - a.forcaJogador;
    }

    goleiros.sort(sortByForca);
    zagueiros.sort(sortByForca);
    laterais.sort(sortByForca);
    volantes.sort(sortByForca);
    meiasCentrais.sort(sortByForca);
    meiasOfensivos.sort(sortByForca);
    pontasEsquerdas.sort(sortByForca);
    pontasDireitas.sort(sortByForca);
    centroavantes.sort(sortByForca);

    const escalação: Jogador[] = [
      goleiros[0], // 1 Goleiro
      ...zagueiros.slice(0, 2), // 2 Zagueiros
      laterais[0], // 1 Lateral Esquerdo
      laterais[1], // 1 Lateral Direito
      volantes[0], // 1 Volante
      meiasCentrais[0], // 1 Meia Central
      meiasOfensivos[0], // 1 Meia Ofensivo
      pontasEsquerdas[0], // 1 Ponta Esquerda
      pontasDireitas[0], // 1 Ponta Direita
      centroavantes[0], // 1 Centroavante
    ];
    // Marcar os jogadores selecionados
    escalação.forEach((jogador) => (jogador.selecionado = true));

    return escalação;
  }
}
