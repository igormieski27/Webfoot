import { Component } from '@angular/core';
import { teams } from '../novo-jogo/teams';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  templateUrl: './importacao-json.component.html',
  styleUrls: ['./importacao-json.component.css'],
})
export class ImportacaoJsonComponent {
  constructor(public dialog: MatDialog, private router: Router) {}
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

  uploadPatch() {
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
            if (timeId) {
              const jogadoresTime = jogadores.times[timeKey].plantel;
              this.times[timeId - 1].jogadores = jogadoresTime;
              this.openDialog('220ms', '220ms');
            }
          }
        } catch (error) {
          console.error('Erro ao importar e atribuir jogadores:', error);
        }
      }
    });

    input.click();
  }

  goHome() {
    this.router.navigateByUrl('/home');
  }
}

@Component({
  selector: 'dialog-success-json',
  templateUrl: 'dialogo-json-sucesso.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class DialogoJsonSucesso {
  constructor(
    public dialogRef: MatDialogRef<DialogoJsonSucesso>,
    private router: Router,
    public dialog: MatDialog
  ) {}
}
