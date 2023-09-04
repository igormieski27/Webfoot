import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { teams } from '../novo-jogo/teams';
import {
  MatDialog,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import jogadores from './jogadores.json';
import { Jogador } from '../model/jogador.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(private router: Router) {}

  public times = teams;

  async startNewGame() {
    if (this.times[0].jogadores.length == 0) {
      const userConfirmed = window.confirm(
        'Não foi importado nenhum arquivo de patch. Você deseja iniciar usando o patch padrão?'
      );
      if (userConfirmed) {
        try {
          for (const timeKey in jogadores.times) {
            if (jogadores.times.hasOwnProperty(timeKey)) {
              const timeId = this.times.find(
                (team) => timeKey === team.nomeTime
              )?.idTime;

              if (timeId) {
                const jogadoresTime =
                  jogadores.times[timeKey as keyof typeof jogadores.times]
                    .plantel;
                this.times[timeId - 1].jogadores =
                  jogadoresTime as unknown as Jogador[];
              }
            }
          }

          const userConfirmed = window.confirm('Importação feita com sucesso.');
          if (userConfirmed) {
            this.router.navigateByUrl('/novo-jogo');
          } else {
            this.router.navigateByUrl('/novo-jogo');
          }
        } catch (error) {
          console.error('Erro ao importar e atribuir jogadores:', error);
        }
      } else {
        return;
      }
    } else {
      this.router.navigateByUrl('/novo-jogo');
    }
  }

  importarJson() {
    this.router.navigateByUrl('/importar');
  }
}
