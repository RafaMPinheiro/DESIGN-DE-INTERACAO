const divConsultaUm = document.getElementById("consulta1");
const divConsultaDois = document.getElementById("consulta2");
const divConsultaTres = document.getElementById("consulta3");

const showConsultaUm = () => {
  fetch("https://brasilapi.com.br/api/banks/v1").then((response) => {
    response.json().then((data) => {
      let number = Math.floor(Math.random() * data.length);
      divConsultaUm.innerHTML = `
        <h2>Consulta 1</h2>
        <p>Nome: ${data[number].name}</p>
        <p>Nome completo: ${data[number].fullName}</p>
        <p>ISPB: ${data[number].ispb}</p>
      `;
    });
  });
};

const showConsultaDois = () => {
  fetch("https://brasilapi.com.br/api/cvm/corretoras/v1").then((response) => {
    response.json().then((data) => {
      let number = Math.floor(Math.random() * data.length);
      let endereco;
      if (data[number]?.complemento) {
        endereco = `${data[number].logradouro}, ${data[number].complemento}, ${data[number].bairro}, ${data[number].municipio} - ${data[number].uf}`;
      } else {
        endereco = `${data[number].logradouro}, ${data[number].bairro}, ${data[number].municipio} - ${data[number].uf}`;
      }
      divConsultaDois.innerHTML = `
        <h2>Consulta 2</h2>
        <p>Nome social: ${data[number].nome_social}</p>
        <p>Nome comercial: ${data[number].nome_comercial}</p>
        <p>Endereço: ${endereco}</p>
      `;
    });
  });
};

const showConsultaTres = () => {
  fetch("https://brasilapi.com.br/api/taxas/v1").then((response) => {
    response.json().then((data) => {
      let number = Math.floor(Math.random() * data.length);
      console.log(number);
      divConsultaTres.innerHTML = `
        <h2>Consulta 3</h2>
        <p>Nome: ${data[number].nome}</p>
        <p>Valor: ${data[number].valor.toLocaleString("pt-br", {
          style: "currency",
          currency: "BRL",
        })}</p>
      `;
    });
  });
};

Promise.all([showConsultaUm(), showConsultaDois(), showConsultaTres()]);
