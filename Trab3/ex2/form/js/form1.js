// Obtém referências para o formulário e o elemento onde os resultados serão exibidos
const form = document.getElementById("form");
const result = document.getElementById("result");

// Função para formatar o CEP no formato "XXXXX-XXX"
const cepFormat = (cep) => {
  // Remove caracteres não numéricos
  const numericCep = cep.replace(/\D/g, "");

  // Aplica a formatação "XXXXX-XXX"
  return numericCep.replace(/(\d{5})(\d{3})/, "$1-$2");
};

// Adiciona um listener para o evento de envio do formulário
form.addEventListener("submit", async (e) => {
  e.preventDefault(); // Impede o envio padrão do formulário

  // Obtém o valor do CEP do input
  const cep = document.getElementById("cep").value;

  try {
    // Realiza uma requisição à API de CEP usando o valor fornecido
    const response = await fetch(`https://brasilapi.com.br/api/cep/v2/${cep}`);
    const data = await response.json();

    // Atualiza o elemento de resultado com os dados retornados da API
    result.innerHTML = `
      <h2>Resultado</h2>
      <p>CEP: ${cepFormat(data.cep)}</p>
      <p>Logradouro: ${data.street}</p>
      <p>Complemento: ${data.complement || "N/A"}</p>
      <p>Bairro: ${data.neighborhood}</p>
      <p>Cidade: ${data.city}</p>
      <p>Estado: ${data.state}</p>
    `;

    document.getElementById("cep").value = ""; // Limpa o campo de CEP
  } catch (error) {
    result.innerHTML = `<p class="text-danger">Erro na busca de CEP: ${error}</p>`;
  }
});
