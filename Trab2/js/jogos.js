// Função para obter um elemento pelo ID
function getElemento(id) {
  return document.getElementById(id);
}

const btnAvancar = getElemento("btnAvanca");

// Função para atualizar os pontos e estatísticas dos times
function atualizarEstatisticas(time1, time2, golsTime1, golsTime2) {
  const vitoria = 3;
  const empate = 1;

  if (golsTime1 > golsTime2) {
    time1.vitorias++;
    time1.pontos += vitoria;
    time2.derrota++;
  } else if (golsTime1 < golsTime2) {
    time2.vitorias++;
    time2.pontos += vitoria;
    time1.derrota++;
  } else {
    time1.empates++;
    time1.pontos += empate;
    time2.empates++;
    time2.pontos += empate;
  }
}

btnAvancar.addEventListener("click", (e) => {
  e.preventDefault();

  for (let i = 1; i <= dadosTimes.qntdJogos; i++) {
    // Obter os gols de cada time
    let golsTime1 = Number(getElemento(`golsTime1${i}`).value);
    let golsTime2 = Number(getElemento(`golsTime2${i}`).value);

    // Obter os nomes dos times
    let nomeTime1 = getElemento(`nomeTime1${i}`).textContent;
    let nomeTime2 = getElemento(`nomeTime2${i}`).textContent;

    // Encontrar os times no array
    let time1 = dadosTimes.find((time) => time.nome === nomeTime1);
    let time2 = dadosTimes.find((time) => time.nome === nomeTime2);

    atualizarEstatisticas(time1, time2, golsTime1, golsTime2);
  }

  localStorage.setItem("Times", JSON.stringify(dadosTimes));

  window.location.href = "classificacao.html";
});
