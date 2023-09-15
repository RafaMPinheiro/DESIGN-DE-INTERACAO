// Função para obter um elemento pelo ID
function getElemento(id) {
  return document.getElementById(id);
}

// Recuperar os dados do campeonato do localStorage
const dadosCampeonato = JSON.parse(localStorage.getItem("Campeonato"));
if (!dadosCampeonato) {
  alert(
    "Os dados do campeonato não foram configurados. Redirecionando para a página inicial."
  );
  // Redirecionar para a página de configuração se os dados não existirem
  window.location.href = "../index.html";
}

const { nomeCampeonato, qntdTimes } = dadosCampeonato;

// Mostrar o nome do campeonato
getElemento("camp").innerHTML = `<h1>${nomeCampeonato}</h1>`;

const formulario = getElemento("form");
const botaoCadastrarTime = getElemento("btnTime");
const botaoAvancar = getElemento("btnAvanca");

// Inicializar o span com o número 1
let indiceTimeAtual = 1;
const span = getElemento("span");
span.textContent = indiceTimeAtual;

const times = [];

botaoCadastrarTime.addEventListener("click", function (e) {
  const inputNomeTime = getElemento("nomeTime");
  const nomeTime = inputNomeTime.value;
  let alerta = getElemento("alert");

  if (nomeTime === "") {
    alerta.innerHTML = "Insira o nome do time!";
    alerta.style.display = "flex";
    alerta.classList.value = "alert alert-danger";
    return;
  } else if (
    times.some((time) => time.nome.toLowerCase() === nomeTime.toLowerCase())
  ) {
    alerta.innerHTML = "Esse time já foi cadastrado!";
    alerta.style.display = "flex";
    alerta.classList.value = "alert alert-danger";
    return;
  }

  getElemento("alert").style.display = "none";

  // Adicionar o time no array de times
  times.push({
    nome: nomeTime,
    vitorias: 0,
    empates: 0,
    derrotas: 0,
    pontos: 0,
  });

  if (times.length === qntdTimes) {
    // Desabilitar o botão de adicionar time
    alerta.innerHTML = "Número máximo de times atingido!";
    alerta.style.display = "flex";
    alerta.classList.value = "alert alert-success";
    botaoAvancar.disabled = false;
    botaoCadastrarTime.disabled = true;
    inputNomeTime.disabled = true;
    localStorage.setItem("Times", JSON.stringify(times));
    return;
  }

  // Mostrar o número do time atual
  indiceTimeAtual++;
  span.textContent = indiceTimeAtual;
  inputNomeTime.value = "";
});

botaoAvancar.addEventListener("click", function (e) {
  e.preventDefault();

  // Redirecionar para a página de jogos
  window.location.href = "jogos.html";
});
