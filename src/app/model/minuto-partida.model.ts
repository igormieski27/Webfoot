import { Jogador } from './jogador.model';

export class minutoPartida {
  idPartida: number = 0;
  idMinuto: number = 0;
  acontecimentoPartida: String = ''; // nada, golCasa, golFora
  jogadorGol: Jogador = new Jogador();
}
