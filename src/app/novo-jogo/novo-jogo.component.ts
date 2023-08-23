import { Component, OnInit } from '@angular/core';
import { teams } from './teams';
import { Time } from '../model/time.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-novo-jogo',
  templateUrl: './novo-jogo.component.html',
  styleUrls: ['./novo-jogo.component.css'],
})
export class NovoJogoComponent implements OnInit {
  constructor(private router: Router) {}
  public selectedTeam: Time = new Time();
  coachName: string = '';
  teams = teams;
  times = [
    'América-MG',
    'Athletico-PR',
    'Atlético-MG',
    'Bahia',
    'Botafogo',
    'Corinthians',
    'Coritiba',
    'Cruzeiro',
    'Cuiabá',
    'Flamengo',
    'Fluminense',
    'Fortaleza',
    'Goiás',
    'Grêmio',
    'Internacional',
    'Palmeiras',
    'Red Bull Bragantino',
    'Santos',
    'São Paulo',
    'Vasco',
  ];

  campeonato: any[] = [];
  jogosJogador: any[] = [];
  ngOnInit(): void {
    this.selectedTeam = teams[0];
  }

  removeAccents(input: string): string {
    return input
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
  }

  getTeamImageUrl(team: string): string {
    const formattedTeamName = this.removeAccents(team).replace(/ /g, '-');
    return `assets/times/${formattedTeamName}.png`;
  }

  startGame() {
    if (this.selectedTeam && this.coachName) {
      console.log('Iniciar Jogo:', this.selectedTeam, this.coachName);

      this.generateSeason(); // Gerar a temporada completa

      this.jogosJogador = this.campeonato.flatMap((rodada) =>
        rodada.filter(
          (partida: { timeCasa: string; timeFora: string }) =>
            partida.timeCasa === this.selectedTeam.nomeTime ||
            partida.timeFora === this.selectedTeam.nomeTime
        )
      );
      console.log(this.jogosJogador);
      this.salvarTimeSelecionado();
      this.router.navigateByUrl('/gerenciador');
    } else {
      alert('Por favor, selecione um time e insira o nome do técnico.');
    }
  }

  salvarTimeSelecionado() {
    localStorage.setItem('timeSelecionado', JSON.stringify(this.selectedTeam));
    localStorage.setItem('treinador', JSON.stringify(this.coachName));
    localStorage.setItem('campeonato', JSON.stringify(this.campeonato));
    localStorage.setItem('jogosTime', JSON.stringify(this.jogosJogador));
  }

  generateSeason() {
    for (let rodada = 0; rodada < 38; rodada++) {
      const rodadaAtual = [];
      const confrontosSorteados = this.shuffle([...this.times]);

      for (let partida = 0; partida < 10; partida++) {
        const timeCasa = confrontosSorteados.pop();
        const timeFora = confrontosSorteados.pop();
        rodadaAtual.push({
          timeCasa,
          timeFora,
          idRodada: rodada + 1,
          idPartida: partida + 1,
        });
      }

      this.campeonato.push(rodadaAtual);
    }
    console.log(this.campeonato);
  }

  shuffle(array: any[]) {
    let currentIndex = array.length;
    let randomIndex, tempValue;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      tempValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = tempValue;
    }

    return array;
  }
}
