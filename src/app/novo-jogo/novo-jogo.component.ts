import { Component, OnInit } from '@angular/core';
import { teams } from './teams';
import { Time } from '../model/time.model';

@Component({
  selector: 'app-novo-jogo',
  templateUrl: './novo-jogo.component.html',
  styleUrls: ['./novo-jogo.component.css'],
})
export class NovoJogoComponent implements OnInit {
  public selectedTeam: Time = {
    idTime: 1,
    nomeTime: 'América-MG',
    forcaAtaque: 3,
    forcaDefesa: 2,
    torcida: 4,
    estadio: 'Estádio Independência',
    capacidadeEstadio: 23018,
    financas: 3,
    idolo: 'Reinaldo',
    nomeCompleto: 'América Futebol Clube',
    titulos: {
      estadual: 16,
      brasileirao: 0,
      copaDoBrasil: 0,
      libertadores: 0,
      mundial: 0,
    },
  };
  coachName: string = '';
  teams = teams;

  ngOnInit(): void {
    console.log(teams);
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
      // Aqui você pode implementar a lógica para iniciar o jogo
    } else {
      alert('Por favor, selecione um time e insira o nome do técnico.');
    }
  }
}
