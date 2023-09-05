import { Jogador } from './jogador.model';
import { minutoPartida } from './minuto-partida.model';
export class Partida {
  idPartida: number = 0;
  idRodada: number = 0;
  idTimeCasa: number = 0;
  idTimeFora: number = 0;
  timeCasa: string = '';
  timeFora: string = '';
  golsTimeCasa: number = 0;
  golsTimeFora: number = 0;
  partida: minutoPartida[] = [];
  estadio: String = '';
  chanceTimeCasa: number = 0;
  chanceTimeFora: number = 0;
  escalacaoTimeCasa: Jogador[] = [];
  escalacaoTimeFora: Jogador[] = [];
}
