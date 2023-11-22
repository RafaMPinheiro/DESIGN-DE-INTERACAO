// Obtém as referências para as divs onde os resultados serão exibidos
const list = document.getElementById("lista");
const info = document.getElementById("info");

// Array que armazenará objetos representando países
const countriesArray = [];

// Função que capitaliza a primeira letra de uma string
const capitalizeStr = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// Função assíncrona que obtém os países a partir de um arquivo JSON
const getCountries = async () => {
  try {
    const response = await fetch("paises.json");
    const countries = await response.json();

    countriesArray.push(...countries);

    countries.forEach((country) => {
      // Cria um elemento de opção para a lista e o adiciona ao DOM
      const option = document.createElement("option");
      option.innerHTML = country.nome_pais;
      list.appendChild(option);
    });

    // Exibe as informações do primeiro país da lista
    showInfo();
  } catch (error) {
    result.innerHTML = `<p class="text-danger">Erro na busca de países: ${error}</p>`;
  }
};

// Função assíncrona que exibe as informações do país selecionado
const showInfo = async () => {
  // Obtém o valor selecionado na lista de países
  const selected = list.options[list.selectedIndex].value;

  // Encontra os objetos país correspondentes no array usando filter
  const filteredCountries = countriesArray.filter(
    (country) => country.nome_pais === selected
  );

  // Verifica se há algum resultado
  if (filteredCountries.length > 0) {
    // Use o primeiro resultado (ou o que preferir, dependendo da lógica do seu aplicativo)
    const country = filteredCountries[0];

    // Atualiza o conteúdo do elemento "info" com informações do país
    info.innerHTML = `
    <p>Nome em pt-BR: ${country.nome_pais}</p>
    <p>Gentílicos: ${capitalizeStr(country.gentilico)}</p>
    <p>Nome internacional: ${country.nome_pais_int}</p>
    <p>Sigla: ${country.sigla}</p>`;
  } else {
    // Caso não haja resultados, limpe o conteúdo
    info.innerHTML = "";
  }
};

getCountries();

// Adiciona um listener para o evento "change" da lista
list.addEventListener("change", showInfo);
