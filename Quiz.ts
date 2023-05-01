// 1 genero
// cOnjunto de perguntas
// perguntas > x opções com 1 resposta

export class Partida {
  quiz: Quiz;
  jogador: string;
  opcoesJogador: Array<Opcao>;

  constructor(quiz: Quiz, jogador: string) {
    this.quiz = quiz;
    this.jogador = jogador;
    this.opcoesJogador = [];
  }
  getPontuacao(): number {
    return this.opcoesJogador.filter((o) => o.correta).length;
  }
}

export class Opcao {
  texto: string;
  correta: boolean;

  constructor(texto: string, correta: boolean) {
    this.texto = texto;
    this.correta = correta;
  }
}

export class Pergunta {
  titulo: string;
  opcoes: Array<Opcao>;

  constructor(titulo: string) {
    this.titulo = titulo;
    this.opcoes = [];
  }

  addOpcao(opcao: Opcao): void {
    this.opcoes.push(opcao);
  }
}

export enum Nivel {
  FACIL,
  MEDIO,
  DIFICIL,
}

export class Quiz {
  genero: string;
  nivel: Nivel;
  perguntas: Array<Pergunta>;

  constructor(genero: string, nivel: Nivel) {
    this.genero = genero;
    this.nivel = nivel;
    this.perguntas = [];
  }

  add(pergunta: Pergunta): void {
    this.perguntas.push(pergunta);
  }
}
