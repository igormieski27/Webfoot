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
      // Aqui você pode implementar a lógica para iniciar o jogo
      this.salvarTimeSelecionado();
      this.router.navigateByUrl('/gerenciador');
    } else {
      alert('Por favor, selecione um time e insira o nome do técnico.');
    }
  }

  salvarTimeSelecionado() {
    localStorage.setItem('timeSelecionado', JSON.stringify(this.selectedTeam));
  }
}
