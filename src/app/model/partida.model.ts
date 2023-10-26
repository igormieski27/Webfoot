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

  posseBolaCasa: number = 0; // Possession for the home team
  posseBolaFora: number = 0; // Possession for the away team

  finalizacoesCasa: number = 0; // Shots for the home team
  finalizacoesFora: number = 0; // Shots for the away team

  finalizacoesNoGolCasa: number = 0; // Shots on target for the home team
  finalizacoesNoGolFora: number = 0; // Shots on target for the away team

  tentativaPasseCasa: number = 0;
  tentativaPasseFora: number = 0;

  passesCompletosCasa: number = 0; // Completed passes for the home team
  passesCompletosFora: number = 0; // Completed passes for the away team

  precisaoPassesCasa: number = 0; // Pass accuracy for the home team
  precisaoPassesFora: number = 0; // Pass accuracy for the away team

  faltasCometidasCasa: number = 0; // Fouls committed by the home team
  faltasCometidasFora: number = 0; // Fouls committed by the away team
}
