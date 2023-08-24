import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { teams } from '../novo-jogo/teams';
import {
  MatDialog,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(private router: Router, public dialog: MatDialog) {}

  public times = teams;

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(DialogoJsonSucesso, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  startNewGame() {
    this.router.navigateByUrl('/novo-jogo'); // Redirecione para a tela "Novo Jogo"
  }

  importarPatch() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';

    input.addEventListener('change', async (event: any) => {
      const file = event.target?.files[0];
      if (file) {
        try {
          const fileContent = await file.text();
          const jogadores = JSON.parse(fileContent);
          for (const timeKey in jogadores.times) {
            console.log(timeKey);

            const timeId = this.times.find(
              (team) => timeKey === team.nomeTime
            )?.idTime;
            console.log(timeId);
            if (timeId) {
              const jogadoresTime = jogadores.times[timeKey].plantel;
              this.times[timeId - 1].jogadores = jogadoresTime;
            }
          }

          this.openDialog('220ms', '220ms');
        } catch (error) {
          console.error('Erro ao importar e atribuir jogadores:', error);
        }
      }
    });

    input.click();
  }
}

@Component({
  selector: 'dialog-success-json',
  templateUrl: 'dialogo-json-sucesso.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class DialogoJsonSucesso {
  constructor(public dialogRef: MatDialogRef<DialogoJsonSucesso>) {}
}
