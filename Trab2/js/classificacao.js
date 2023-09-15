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

// Ordene os times com base na pontuação
dadosTimes.sort((a, b) => b.pontos - a.pontos);

const larguraDaJanela = window.innerWidth;
const tabelaHead = getElemento("tabela").getElementsByTagName("thead")[0];
const tabelaBody = getElemento("tabela").getElementsByTagName("tbody")[0];

// Função para imprimir o cabeçalho da tabela
function imprimirCabecalho() {
  const colunas = [
    { nome: larguraDaJanela > 500 ? "Posição" : "Pos.", fonte: "1rem" },
    { nome: "Nome", fonte: "1rem" },
    { nome: larguraDaJanela > 500 ? "Vitórias" : "Vit.", fonte: "1rem" },
    { nome: larguraDaJanela > 500 ? "Empates" : "Emp.", fonte: "1rem" },
    { nome: larguraDaJanela > 500 ? "Derrotas" : "Der.", fonte: "1rem" },
    { nome: larguraDaJanela > 500 ? "Pontuação" : "Pts.", fonte: "1rem" },
  ];

  const row = tabelaHead.insertRow();

  colunas.forEach((coluna) => {
    const cell = row.insertCell();
    cell.innerHTML = coluna.nome;
    cell.style.textAlign = "center";
    cell.style.fontWeight = "bold";
    cell.style.fontSize = larguraDaJanela > 500 ? coluna.fonte : "0.8rem";
  });
}

// Função para imprimir os times na tabela
function imprimirBody(time, posicao) {
  const row = tabelaBody.insertRow();

  const colunas = [
    { dado: posicao, fonte: "1rem" },
    { dado: time.nome, fonte: "1rem" },
    { dado: time.vitorias, fonte: "1rem" },
    { dado: time.empates, fonte: "1rem" },
    { dado: time.derrotas, fonte: "1rem" },
    { dado: time.pontos, fonte: "1rem" },
  ];

  colunas.forEach((coluna) => {
    const cell = row.insertCell();
    cell.innerHTML = coluna.dado;
    cell.style.textAlign = "center";
    cell.style.fontSize = larguraDaJanela > 500 ? coluna.fonte : "0.8rem";
  });
}

imprimirCabecalho();
for (let i = 0; i < dadosCampeonato.qntdTimes; i++) {
  imprimirBody(dadosTimes[i], i + 1);
}
