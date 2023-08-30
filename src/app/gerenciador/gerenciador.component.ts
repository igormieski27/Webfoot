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

  escalarAutomaticamente() {
    const selectedPlayers: Jogador[] = [];

    selectedPlayers.push(this.selectTopPlayerByPosition('Goleiro'));

    selectedPlayers.push(...this.selectTopNPlayersByPosition('Zagueiro', 2));
    selectedPlayers.push(this.selectTopPlayerByPosition('Lateral', 'Esq.'));
    selectedPlayers.push(this.selectTopPlayerByPosition('Lateral', 'Dir.'));
    selectedPlayers.push(this.selectTopPlayerByPosition('Volante'));

    selectedPlayers.push(
      ...this.selectTopNPlayersByPosition('Meia Central', 2)
    );
    selectedPlayers.push(this.selectTopPlayerByPosition('Ponta Direita'));
    selectedPlayers.push(this.selectTopPlayerByPosition('Centroavante'));
    selectedPlayers.push(this.selectTopPlayerByPosition('Ponta Esquerda'));

    this.dataSource.data.forEach((jogador) => {
      jogador.selecionado = selectedPlayers.some((selectedJogador) => {
        return (
          selectedJogador.nomeJogador === jogador.nomeJogador &&
          selectedJogador.forcaJogador === jogador.forcaJogador
        );
      });
    });

    console.log(this.dataSource.data);
    alert('Escalação automática concluída.');
  }

  selectTopPlayerByPosition(position: string, subPosition?: string): Jogador {
    const playersInPosition = this.dataSource.data.filter(
      (jogador) => jogador.posicaoJogador === position
    );

    if (subPosition) {
      return playersInPosition
        .filter((jogador) =>
          jogador.pePreferido.toLowerCase().includes(subPosition)
        )
        .reduce(
          (a, b) => (a.forcaJogador > b.forcaJogador ? a : b),
          playersInPosition[0]
        );
    }

    return playersInPosition.reduce(
      (a, b) => (a.forcaJogador > b.forcaJogador ? a : b),
      playersInPosition[0]
    );
  }

  selectTopNPlayersByPosition(position: string, n: number): Jogador[] {
    const playersInPosition = this.dataSource.data.filter(
      (jogador) => jogador.posicaoJogador === position
    );
    return playersInPosition
      .sort((a, b) => b.forcaJogador - a.forcaJogador)
      .slice(0, n);
  }
}
