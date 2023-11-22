// Obtém referências para os elementos do formulário e de resultados
const form = document.getElementById("form");
const result = document.getElementById("result");

// Adiciona um listener para o evento de envio do formulário
form.addEventListener("submit", async (event) => {
  event.preventDefault(); // Impede o envio padrão do formulário

  // Obtém a sigla da UF do input
  const ufSigla = document.getElementById("uf").value;

  try {
    // Realiza uma requisição à API de municípios usando a UF fornecida
    const apiUrl = `https://brasilapi.com.br/api/ibge/municipios/v1/${ufSigla}?providers=dados-abertos-br,gov,wikipedia`;
    const response = await fetch(apiUrl);
    const municipios = await response.json();

    // Constrói a tabela HTML para exibir os municípios
    let tableHtml =
      '<table class="table"><thead class="thead-dark"><tr><th scope="col">Município</th><th scope="col">Código IBGE</th></tr></thead><tbody>';

    // Itera sobre a lista de municípios
    municipios.forEach((municipio) => {
      // Adiciona uma linha à tabela para cada município
      tableHtml += `<tr><td>${municipio.nome}</td><td>${municipio.codigo_ibge}</td></tr>`;
    });

    // Fecha a tabela antes de atribuir ao conteúdo do elemento result
    tableHtml += "</tbody></table>";

    result.innerHTML = tableHtml;
  } catch (error) {
    result.innerHTML = `<p class="text-danger">Erro na busca de municípios: ${error}</p>`;
  }
});
