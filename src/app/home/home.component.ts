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
  constructor(private router: Router) {}

  public times = teams;

  startNewGame() {
    this.router.navigateByUrl('/novo-jogo');
  }

  importarJson() {
    this.router.navigateByUrl('/importar');
  }
}
