// Obtém referências para os elementos do formulário e de resultados
const form = document.getElementById("form");
const result = document.getElementById("result");

// Adiciona um listener para o evento de envio do formulário
form.addEventListener("submit", async (event) => {
  event.preventDefault(); // Impede o envio padrão do formulário

  // Obtém o valor do ano fornecido pelo usuário
  const ano = document.getElementById("ano").value;

  try {
    // Realiza uma requisição à API de feriados usando o ano fornecido
    const apiUrl = `https://brasilapi.com.br/api/feriados/v1/${ano}`;
    const response = await fetch(apiUrl);
    const feriados = await response.json();

    // Constrói a tabela HTML para exibir os feriados
    let tableHtml =
      '<table class="table"><thead class="thead-dark"><tr><th scope="col">Feriado</th><th scope="col">Data</th></tr></thead><tbody>';

    // Itera sobre a lista de feriados
    feriados.forEach((feriado) => {
      // Formata a data no formato "dd/mm/aaaa"
      const dataFormatada = new Date(feriado.date).toLocaleDateString("pt-BR");

      // Adiciona uma linha à tabela para cada feriado
      tableHtml += `<tr><td>${feriado.name}</td><td>${dataFormatada}</td></tr>`;
    });

    // Fecha a tabela antes de atribuir ao conteúdo do elemento result
    tableHtml += "</tbody></table>";

    result.innerHTML = tableHtml;
  } catch (error) {
    result.innerHTML = `<p class="text-danger">Erro na busca de feriados: ${error}</p>`;
  }
});
