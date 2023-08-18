export class Time {
  idTime: number = 0;
  nomeTime: string = 'Nenhum';
  forcaAtaque: number = 0;
  forcaDefesa: number = 0;
  torcida: number = 0;
  estadio: string = '';
  capacidadeEstadio: number = 0;
  financas: number = 0;
  idolo: string = '';
  nomeCompleto: string = '';
  titulos!: {
    estadual: number;
    brasileirao: number;
    copaDoBrasil: number;
    libertadores: number;
    mundial: number;
  };
}
