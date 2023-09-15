// Função para obter um elemento pelo ID
function getElemento(id) {
  return document.getElementById(id);
}

// Limpar o localStorage ao carregar a página
window.onload = function () {
  localStorage.clear();
};

const botao = getElemento("button");

botao.addEventListener("click", (evento) => {
  evento.preventDefault();

  // Obter o nome do campeonato e a quantidade de times
  const nomeCampeonato = getElemento("nomeCamp").value.trim();
  const qntdTimes = Number(getElemento("qntdTimes").value.trim());
  const alerta = getElemento("alert");
  alerta.style.display = "none";
  alerta.innerHTML = "";

  if (nomeCampeonato === "") {
    alerta.innerHTML = "Por favor, insira um nome para o campeonato!";
    alerta.style.display = "flex";
    alerta.classList.value = "alert alert-danger";
    return;
  } else if (qntdTimes < 4 || qntdTimes > 20) {
    alerta.innerHTML = "Insira um número de times/jogadores entre 4 e 20!";
    alerta.style.display = "flex";
    alerta.classList.value = "alert alert-danger";
    return;
  }

  // Calcular a quantidade de jogos
  const qntdJogos = (qntdTimes * (qntdTimes - 1)) / 2;

  // Salvar no localStorage
  localStorage.setItem(
    "Campeonato",
    JSON.stringify({ nomeCampeonato, qntdTimes, qntdJogos })
  );

  // Redirecionar para a página de cadastros
  window.location.href = "html/cadastros.html";
});
