// Obtém as referências para as divs onde os resultados serão exibidos
const result = document.getElementById("result");

const form = document.getElementById("form");

// Função para exibir resultados da Consulta 1
const showConsultaUm = async () => {
  try {
    const response = await fetch("https://brasilapi.com.br/api/banks/v1");
    const data = await response.json();

    // Gera um número aleatório para selecionar um item aleatório do array
    const randomIndex = Math.floor(Math.random() * data.length);

    // Atualiza a div com os resultados da Consulta 1
    html = `
      <h3>Consulta 1</h3>
      <p>Nome: ${data[randomIndex].name}</p>
      <p>Nome completo: ${data[randomIndex].fullName}</p>
      <p>ISPB: ${data[randomIndex].ispb}</p>
    `;
  } catch (error) {
    html = `<p class="text-danger">Erro na Consulta 1: ${error}</p>`;
  }
};

// Função para exibir resultados da Consulta 2
const showConsultaDois = async () => {
  try {
    const response = await fetch(
      "https://brasilapi.com.br/api/cvm/corretoras/v1"
    );
    const data = await response.json();

    // Gera um número aleatório para selecionar um item aleatório do array
    const randomIndex = Math.floor(Math.random() * data.length);
    let endereco;

    // Verifica se o campo 'complemento' existe antes de incluí-lo no endereço
    if (data[randomIndex]?.complemento) {
      endereco = `${data[randomIndex].logradouro}, ${data[randomIndex].complemento}, ${data[randomIndex].bairro}, ${data[randomIndex].municipio} - ${data[randomIndex].uf}`;
    } else {
      endereco = `${data[randomIndex].logradouro}, ${data[randomIndex].bairro}, ${data[randomIndex].municipio} - ${data[randomIndex].uf}`;
    }

    // Atualiza a div com os resultados da Consulta 2
    html = `
      <h3>Consulta 2</h3>
      <p>Nome social: ${data[randomIndex].nome_social}</p>
      <p>Nome comercial: ${data[randomIndex].nome_comercial}</p>
      <p>Endereço: ${endereco}</p>
    `;
  } catch (error) {
    html = `<p class="text-danger">Erro na Consulta 2: ${error}</p>`;
  }
};

// Função para exibir resultados da Consulta 3
const showConsultaTres = async () => {
  try {
    const response = await fetch("https://brasilapi.com.br/api/taxas/v1");
    const data = await response.json();

    // Gera um número aleatório para selecionar um item aleatório do array
    const randomIndex = Math.floor(Math.random() * data.length);

    // Exibe o resultado da Consulta 3, formatando o valor como moeda brasileira
    html = `
      <h3>Consulta 3</h3>
      <p>Nome: ${data[randomIndex].nome}</p>
      <p>Valor: ${data[randomIndex].valor.toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL",
      })}</p>
    `;
  } catch (error) {
    html = `<p class="text-danger">Erro na Consulta 3: ${error}</p>`;
  }
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  result.innerHTML = "";

  // Executa todas as consultas e exibe os resultados quando todas estiverem prontas
  Promise.race([showConsultaUm(), showConsultaDois(), showConsultaTres()]).then(
    () => {
      result.innerHTML += html;
    }
  );
});
