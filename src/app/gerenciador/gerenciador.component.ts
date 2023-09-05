import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { Jogador } from '../model/jogador.model';
import { Time } from '../model/time.model';
import { Partida } from '../model/partida.model';
@Component({
  templateUrl: './gerenciador.component.html',
  styleUrls: ['./gerenciador.component.css'],
})
export class GerenciadorComponent implements OnInit {
  escalacaoTimeCasa: any;
  escalacaoTimeFora: any;
  constructor(private router: Router) {}
  timeSelecionado: Time = new Time(); // Inicialize com null
  timeAdversario: Time = new Time();
  partida: Partida = new Partida();
  jogadores: Jogador[] = []; // Inicialize com um array vazio
  dataSource: MatTableDataSource<Jogador> = new MatTableDataSource();
  urlEscudo: String = '';
  prePartida: boolean = false;
  displayedColumns: string[] = [
    'posicao',
    'nome',
    'pePreferido',
    'idade',
    'altura',
    'valorDeMercado',
    'forca',
  ];

  displayedColumnsPrePartida: string[] = [
    'selecionado',
    'posicao',
    'nome',
    'pePreferido',
    'forca',
  ];
  treinador: String = '';
  jogosTime: any[] = [];
  campeonato: any[] = [];
  proximoJogo: any;
  escalacaoJogador: any[] = [];
  times: any[] = [];
  taticaJogo: String = 'Equilibrado';
  taticas: any[] = ['Equilibrado', 'Ataque Total', 'Contra-Ataque'];
  escalacaoAdversario: any;
  timeSelecionadoId: number | undefined;
  timeAdversarioId: any;

  ngOnInit() {
    this.recuperarTimeSelecionado();
    if (this.timeSelecionado) {
      // Verifique se timeSelecionado não é null
      this.urlEscudo = this.getTeamImageUrl(this.timeSelecionado.nomeTime);
      this.jogadores = this.timeSelecionado.jogadores; // Suponha que o time selecionado tenha a lista de jogadores
      this.dataSource = new MatTableDataSource(this.jogadores);
    }
    this.proximoJogo = this.jogosTime[0];
  }

  recuperarTimeSelecionado() {
    const timeSelecionadoStr = localStorage.getItem('timeSelecionado');
    if (timeSelecionadoStr) {
      // Verifique se o valor não é null
      this.timeSelecionado = JSON.parse(timeSelecionadoStr);
    }
    const jogosTime = localStorage.getItem('jogosTime');
    if (jogosTime) {
      // Verifique se o valor não é null
      this.jogosTime = JSON.parse(jogosTime);
    }
    const campeonato = localStorage.getItem('campeonato');
    if (campeonato) {
      // Verifique se o valor não é null
      this.campeonato = JSON.parse(campeonato);
    }
    const treinador = localStorage.getItem('treinador');
    if (treinador) {
      this.treinador = JSON.parse(treinador);
    }

    const times = localStorage.getItem('listaTimes');
    if (times) {
      this.times = JSON.parse(times);
    }
  }

  calcularValorTotalTime(): number {
    if (this.timeSelecionado) {
      return this.jogadores.reduce(
        (total, jogador) => total + jogador.valorJogador,
        0
      );
    }
    return 0;
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

  iniciarJogo() {
    this.prePartida = true;
  }

  toggleSelectAll() {
    for (const jogador of this.jogadores) {
      jogador.selecionado = !jogador.selecionado;
    }
  }

  escalarTime(jogadores: Jogador[]): Jogador[] {
    const goleiros = jogadores.filter((jogador) => jogador.posicao === 'GOL');
    const zagueiros = jogadores.filter((jogador) => jogador.posicao === 'ZAG');
    const laterais = jogadores.filter(
      (jogador) => jogador.posicao === 'LTE' || jogador.posicao === 'LTD'
    );
    const volantes = jogadores.filter((jogador) => jogador.posicao === 'VOL');
    const meiasCentrais = jogadores.filter(
      (jogador) => jogador.posicao === 'MCE'
    );
    const meiasOfensivos = jogadores.filter(
      (jogador) => jogador.posicao === 'MOF'
    );
    const pontasEsquerdas = jogadores.filter(
      (jogador) => jogador.posicao === 'PE'
    );
    const pontasDireitas = jogadores.filter(
      (jogador) => jogador.posicao === 'PD'
    );
    const centroavantes = jogadores.filter(
      (jogador) => jogador.posicao === 'CA'
    );

    function sortByForca(a: Jogador, b: Jogador): number {
      return b.forca - a.forca;
    }

    goleiros.sort(sortByForca);
    zagueiros.sort(sortByForca);
    laterais.sort(sortByForca);
    volantes.sort(sortByForca);
    meiasCentrais.sort(sortByForca);
    meiasOfensivos.sort(sortByForca);
    pontasEsquerdas.sort(sortByForca);
    pontasDireitas.sort(sortByForca);
    centroavantes.sort(sortByForca);

    const escalação: Jogador[] = [
      goleiros[0], // 1 Goleiro
      ...zagueiros.slice(0, 2), // 2 Zagueiros
      laterais[0], // 1 Lateral Esquerdo
      laterais[1], // 1 Lateral Direito
      volantes[0], // 1 Volante
      meiasCentrais[0], // 1 Meia Central
      meiasOfensivos[0], // 1 Meia Ofensivo
      pontasEsquerdas[0], // 1 Ponta Esquerda
      pontasDireitas[0], // 1 Ponta Direita
      centroavantes[0], // 1 Centroavante
    ];
    // Marcar os jogadores selecionados
    escalação.forEach((jogador) => (jogador.selecionado = true));

    return escalação.filter((jogador) => jogador.selecionado === true);
  }

  iniciarPartida() {
    const objProbabilidades = this.pegarEscalacaoTimes();
    let timeCasa = this.times.filter(
      (time) => (time.idTime = this.proximoJogo.idTimeCasa)
    );
    let timeFora = this.times.filter(
      (time) => (time.idTime = this.proximoJogo.idTimeFora)
    );
    timeCasa = timeCasa[0];
    timeFora = timeFora[0];
    this.partida = {
      idRodada: 1,
      idPartida: this.proximoJogo.idPartida,
      idTimeCasa: this.proximoJogo.idTimeCasa,
      idTimeFora: this.proximoJogo.idTimeFora,
      timeCasa: this.proximoJogo.timeCasa,
      timeFora: this.proximoJogo.timeFora,
      golsTimeCasa: 0,
      golsTimeFora: 0,
      chanceTimeCasa: objProbabilidades.chanceTimeCasa,
      chanceTimeFora: objProbabilidades.chanceTimeFora,
      partida: [],
      estadio: this.proximoJogo.estadio,
      escalacaoTimeCasa: this.escalacaoTimeCasa,
      escalacaoTimeFora: this.escalacaoTimeFora,
    };
    localStorage.setItem('partida', JSON.stringify(this.partida));
    localStorage.setItem('timeCasa', JSON.stringify(timeCasa));
    localStorage.setItem('timeFora', JSON.stringify(timeFora));
    this.router.navigateByUrl('/partida');
  }

  pegarEscalacaoTimes() {
    this.escalacaoJogador = this.jogadores.filter(
      (jogador) => jogador.selecionado === true
    );
    this.timeSelecionadoId = this.timeSelecionado.idTime;
    this.timeAdversarioId =
      this.proximoJogo.idTimeCasa != this.timeSelecionadoId
        ? this.proximoJogo.idTimeCasa
        : this.proximoJogo.idTimeFora;
    const timeAdversario = this.times.filter(
      (time) => time.idTime == this.timeAdversarioId
    );
    this.timeAdversario = timeAdversario[0];
    this.escalacaoAdversario = this.escalarTime(this.timeAdversario.jogadores);
    this.escalacaoTimeCasa =
      this.proximoJogo.idTimeCasa == this.timeSelecionado.idTime
        ? this.escalacaoJogador
        : this.escalacaoAdversario;
    this.escalacaoTimeFora =
      this.proximoJogo.idTimeCasa == this.timeSelecionado.idTime
        ? this.escalacaoAdversario
        : this.escalacaoJogador;

    const forcaMediaTimeCasa = this.calcularForcaMedia(this.escalacaoTimeCasa);
    const forcaMediaTimeFora = this.calcularForcaMedia(this.escalacaoTimeFora);
    const probabilidades = this.calcularProbabilidadeVitoria(
      forcaMediaTimeCasa,
      forcaMediaTimeFora
    );
    const pCasa = parseFloat(probabilidades.time1);
    const pFora = parseFloat(probabilidades.time2);
    return {
      chanceTimeCasa: pCasa,
      chanceTimeFora: pFora,
    };
  }

  calcularForcaMedia(escalacao: Jogador[] = []) {
    if (escalacao.length !== 11) {
      throw new Error('A escalação deve conter 11 jogadores.');
    }

    let somaForca = 0;

    for (let i = 0; i < 11; i++) {
      somaForca += escalacao[i].forca;
    }

    const mediaForca = somaForca / 11;
    return mediaForca;
  }

  calcularProbabilidadeVitoria(
    forcaMediaTime1: number,
    forcaMediaTime2: number
  ) {
    // Verifica se as forças médias estão dentro do intervalo permitido
    if (
      forcaMediaTime1 < 0 ||
      forcaMediaTime1 > 100 ||
      forcaMediaTime2 < 0 ||
      forcaMediaTime2 > 100
    ) {
      throw new Error(
        'As forças médias de cada time devem estar no intervalo de 0 a 100.'
      );
    }

    // Calcula a diferença entre as forças médias
    const diferencaForcas = forcaMediaTime1 - forcaMediaTime2;

    // Calcula a probabilidade de vitória do time 1, empate e vitória do time 2
    const probabilidadeTime1 =
      diferencaForcas > 0
        ? 50 + diferencaForcas / 2
        : 50 - -diferencaForcas / 2;
    const probabilidadeEmpate = 100 - probabilidadeTime1;

    return {
      time1: probabilidadeTime1.toFixed(2),
      time2: probabilidadeEmpate.toFixed(2),
    };
  }
}
