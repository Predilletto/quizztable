import { Partida } from "./Quiz";
import { getQuiz } from "./Quizes";

function main(): void {
  //create new quiz
  //for every question the user has to choose an option.
  //after every question we show how much the user has got it right.

  const quiz = getQuiz();
  const partida = new Partida(quiz, "daniel");

  for (let pergunta of quiz.perguntas) {
    console.log(pergunta.titulo);
    for (let opcao of pergunta.opcoes) {
      console.log(opcao.texto);
    }
    const index = 0;
    const opcaoIndex = pergunta.opcoes[index];
    if (opcaoIndex.correta) {
      //acertou.
    }
    partida.opcoesJogador.push(opcaoIndex);
  }
  console.log("O jogador acertou: ");
  console.log(partida.getPontuacao());
}

main();

export {};
