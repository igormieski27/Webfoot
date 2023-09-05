import { Component, OnInit } from '@angular/core';
import { Partida } from '../model/partida.model';
import { Time } from '../model/time.model';
import { Jogador } from '../model/jogador.model';

@Component({
  templateUrl: './partida.component.html',
  styleUrls: ['./partida.component.css'],
})
export class PartidaComponent implements OnInit {
  partida = new Partida();
  timeCasa = new Time();
  timeFora = new Time();
  urlTimeFora: String = '';
  urlTimeCasa: String = '';
  ngOnInit(): void {
    const partida = localStorage.getItem('partida');
    if (partida) {
      this.partida = JSON.parse(partida);
    }
    const timeCasa = localStorage.getItem('timeCasa');
    if (timeCasa) {
      this.timeCasa = JSON.parse(timeCasa);
    }
    const timeFora = localStorage.getItem('timeFora');
    if (timeFora) {
      this.timeFora = JSON.parse(timeFora);
    }
    this.urlTimeCasa = this.getTeamImageUrl(this.partida.timeCasa);
    this.urlTimeFora = this.getTeamImageUrl(this.partida.timeFora);
    for (let i = 0; i <= 90; i++) {
      this.rodarMinuto(
        i,
        this.partida.chanceTimeCasa,
        this.partida.chanceTimeFora
      );
    }
  }

  getTeamImageUrl(team: string): string {
    const formattedTeamName = this.removeAccents(team).replace(/ /g, '-');
    return `assets/times/${formattedTeamName}.png`;
  }

  removeAccents(input: string): string {
    return input
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
  }

  // Função para calcular a probabilidade com base na posição do jogador
  calcularProbabilidadePorPosicao(posicao: string): number {
    switch (posicao) {
      case 'GOL':
        return 0.001; // Chance muito baixa para goleiros
      case 'ZAG':
        return 0.02; // Exemplo de chance para zagueiros
      case 'LTD':
        return 0.02; // Exemplo de chance para laterais direitos
      case 'LTE':
        return 0.02; // Exemplo de chance para laterais esquerdos
      case 'VOL':
        return 0.03; // Exemplo de chance para volantes
      case 'MCE':
        return 0.03; // Exemplo de chance para meias centrais
      case 'MOF':
        return 0.04; // Exemplo de chance para meias ofensivos
      case 'PE':
        return 0.02; // Exemplo de chance para pontas esquerdas
      case 'PD':
        return 0.02; // Exemplo de chance para pontas direitas
      case 'CA':
        return 0.06; // Chance mais alta para centroavantes
      default:
        return 0.01; // Chance padrão para outras posições desconhecidas
    }
  }

  // Função para selecionar um jogador com base na probabilidade de sua posição
  selecionarJogadorComProbabilidade(escalacao: Jogador[]): Jogador {
    let totalProbabilidade = 0;
    const probabilidadePorPosicao: { [posicao: string]: number } = {};

    // Calcula a probabilidade total e a probabilidade por posição
    escalacao.forEach((jogador) => {
      const probabilidade = this.calcularProbabilidadePorPosicao(
        jogador.posicao
      );
      totalProbabilidade += probabilidade;
      probabilidadePorPosicao[jogador.posicao] = probabilidade;
    });

    // Gera um número aleatório entre 0 e a probabilidade total
    const numeroAleatorio = Math.random() * totalProbabilidade;

    // Percorre as posições e encontra o jogador correspondente
    let somaProbabilidade = 0;
    for (const [posicao, prob] of Object.entries(probabilidadePorPosicao)) {
      somaProbabilidade += prob;
      if (numeroAleatorio <= somaProbabilidade) {
        const jogadoresNaPosicao = escalacao.filter(
          (jogador) => jogador.posicao === posicao
        );
        const jogadorSorteado =
          jogadoresNaPosicao[
            Math.floor(Math.random() * jogadoresNaPosicao.length)
          ];
        return jogadorSorteado;
      }
    }

    // Caso não encontre, retorna um jogador aleatório
    return escalacao[Math.floor(Math.random() * escalacao.length)];
  }

  // Função rodarMinuto atualizada
  rodarMinuto(minuto: number, probTimeCasa: number, probTimeFora: number) {
    // Normaliza as probabilidades para 0-1 (em vez de 0-100)
    probTimeCasa = probTimeCasa / 3000; // Por exemplo, 0.01% de chance a cada minuto
    probTimeFora = probTimeFora / 3000; // Por exemplo, 0.01% de chance a cada minuto

    const numeroAleatorio = Math.random();
    console.log(
      `Probabilidades: Casa ${probTimeCasa}, Fora ${probTimeFora}, Aleatório ${numeroAleatorio}`
    );

    if (numeroAleatorio < probTimeCasa) {
      // Gol para o time da casa
      const jogadorGol = this.selecionarJogadorComProbabilidade(
        this.partida.escalacaoTimeCasa
      );
      console.log('Gol para o time da casa:', jogadorGol);
      this.partida.golsTimeCasa++;
      this.partida.partida[minuto] = {
        idPartida: this.partida.idPartida,
        idMinuto: minuto,
        acontecimentoPartida: 'golCasa',
        jogadorGol: jogadorGol,
      };
    } else if (numeroAleatorio < probTimeCasa + probTimeFora) {
      // Gol para o time visitante
      const jogadorGol = this.selecionarJogadorComProbabilidade(
        this.partida.escalacaoTimeFora
      );
      console.log('Gol para o time visitante:', jogadorGol);
      this.partida.golsTimeFora++;
      this.partida.partida[minuto] = {
        idPartida: this.partida.idPartida,
        idMinuto: minuto,
        acontecimentoPartida: 'golFora',
        jogadorGol: jogadorGol,
      };
    } else {
      // Nenhum gol neste minuto
      console.log('Nenhum gol neste minuto');
      this.partida.partida[minuto] = {
        idPartida: this.partida.idPartida,
        idMinuto: minuto,
        acontecimentoPartida: '',
        jogadorGol: new Jogador(),
      };
    }
  }
}
