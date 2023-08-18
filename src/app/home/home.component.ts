import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(private router: Router) {}
  startNewGame() {
    this.router.navigateByUrl('/novo-jogo'); // Redirecione para a tela "Novo Jogo"
  }
}
