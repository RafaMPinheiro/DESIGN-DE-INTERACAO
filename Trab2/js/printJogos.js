// Função para obter um elemento pelo ID
function getElemento(id) {
  return document.getElementById(id);
}

// Recuperar os dados do campeonato e dos times do localStorage
const dadosCampeonato = JSON.parse(localStorage.getItem("Campeonato"));
const dadosTimes = JSON.parse(localStorage.getItem("Times"));

if (!dadosCampeonato || !dadosTimes) {
  alert(
    "Os dados do campeonato não foram configurados. Redirecionando para a página inicial."
  );
  // Redirecionar para a página de configuração se os dados não existirem
  window.location.href = "../index.html";
}

// Mostrar o nome do campeonato
getElemento("camp").innerHTML = `<h1>${dadosCampeonato.nomeCampeonato}</h1>`;

// Função para imprimir os jogos na tela
function imprimirPartida(time1, time2, partida) {
  const tabela = getElemento("tabela");
  tabela.style.marginTop = "20px";
  tabela.style.marginBottom = "20px";
  tabela.innerHTML += `
    <div id="partida" class="card">
      <h5 class="card-title" style="font-weight: bold;">Partida ${partida}</h5>
      <div class="placar">
        <input type="number" id="golsTime1${partida}" min="0" max="9" value="0" class="form-control" style="width: 50px;">
        <p id="nomeTime1${partida}">${time1}</p>
        <p>X</p>
        <p id="nomeTime2${partida}">${time2}</p>
        <input type="number" id="golsTime2${partida}" min="0" max="9" value="0" class="form-control" style="width: 50px;">
      </div>
    </div>`;
}

for (let i = 0, partida = 1; i < dadosTimes.length - 1; i++) {
  for (let j = i + 1; j < dadosTimes.length; j++) {
    imprimirPartida(dadosTimes[i].nome, dadosTimes[j].nome, partida);
    partida++;
  }
}

