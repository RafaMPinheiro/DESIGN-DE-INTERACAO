const lista = document.getElementById("lista");
const info = document.getElementById("info");

const paisObj = [];
const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const getPaises = async () => {
  const response = await fetch("/Trab3/paises.json");
  const paises = await response.json();
  return paises;
};

const showInfo = async () => {
  const selected = lista.options[lista.selectedIndex].value;
  const pais = paisObj.find((pais) => pais.nome_pais === selected);
  info.innerHTML = `
  <p>Nome em pt-BR: ${pais.nome_pais}</p>
  <p>Gentílicos: ${capitalize(pais.gentilico)}</p>
  <p>Nome internacional: ${pais.nome_pais_int}</p>
  <p>Sigla: ${pais.sigla}</p>`;
};

getPaises().then((response) => {
  response.forEach((pais) => {
    paisObj.push(pais);
    const option = document.createElement("option");
    option.innerHTML = pais.nome_pais;
    lista.appendChild(option);
  });
  showInfo();
});
