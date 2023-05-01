import { Nivel, Opcao, Pergunta, Quiz } from "./Quiz";

function newPergunta(titulo: string, opcoes: Array<Opcao>): Pergunta {
  let pergunta = new Pergunta(titulo);
  pergunta.opcoes = opcoes;
  return pergunta;
}

function newQuiz(
  genero: string,
  nivel: Nivel,
  perguntas: Array<Pergunta>
): Quiz {
  let quiz = new Quiz(genero, nivel);
  quiz.perguntas = perguntas;

  return quiz;
}

export function getQuiz(): Quiz {
  const quizes = [
    newQuiz("Dragon ball", Nivel.FACIL, [
      newPergunta("Dabura é mal?", [
        new Opcao("sim", true),
        new Opcao("nao", false),
      ]),
      newPergunta("Goku é bom?", [
        new Opcao("sim", true),
        new Opcao("não", false),
      ]),
    ]),
    ,
    newQuiz("Homem Aranha", Nivel.FACIL, [
      newPergunta("Peter Parker é o HOmem aranha? ", [
        new Opcao("Sim", true),
        new Opcao("nao", false),
      ]),
      newPergunta("Tia may morre em qual filme da nova franquia?", [
        new Opcao("De volta ao lar", false),
        new Opcao("Aranhaverso", true),
        new Opcao("Longe de casa", false),
      ]),
    ]),
  ];

  return quizes[Math.floor(Math.random() * quizes.length)]!;
}
