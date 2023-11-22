const form = document.getElementById("form");
const select = document.getElementById("categoria");
const result = document.getElementById("result");

function createRow(label, value) {
  const row = document.createElement("div");
  row.classList.add("row", "mb-2");

  const labelCol = document.createElement("div");
  labelCol.classList.add("col-sm-4", "font-weight-bold");
  labelCol.textContent = label;

  const valueCol = document.createElement("div");
  valueCol.classList.add("col-sm-8");
  valueCol.textContent = value;

  row.appendChild(labelCol);
  row.appendChild(valueCol);

  return row;
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const category = select.value;
  const url = `http://www.ipeadata.gov.br/api/odata4/Metadados('${category}')`;

  try {
    const response = await fetch(url);
    const metadata = await response.json();

    let data = metadata.value[0];

    const container = document.createElement("div");
    container.classList.add("container");

    const card = document.createElement("div");
    card.classList.add("card");

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const labelValuePairs = {
      "Código do Serviço": data.SERCODIGO,
      "Nome do Serviço": data.SERNOME,
      "Comentário do Serviço": data.SERCOMENTARIO,
      "Data de Atualização": data.SERATUALIZACAO,
      "Nome da Base": data.BASNOME,
      "Abreviação da Fonte": data.FNTSIGLA,
      "Nome da Fonte": data.FNTNOME,
      "URL da Fonte": data.FNTURL,
      "Período da Pesquisa": data.PERNOME,
      "Unidade de Medida": data.UNINOME,
      "Nome do Multiplicador": data.MULNOME,
      "Status do Serviço": data.SERSTATUS,
      "Código do Tema": data.TEMCODIGO,
      "Código do País": data.PAICODIGO,
      "É Numérica?": data.SERNUMERICA,
    };

    for (const [label, value] of Object.entries(labelValuePairs)) {
      cardBody.appendChild(createRow(label, value));
    }

    card.appendChild(cardBody);
    container.appendChild(card);
    result.innerHTML = container.outerHTML;
  } catch (error) {
    result.innerHTML = `<p class="text-danger">Erro na busca de metadados: ${error}</p>`;
  }
});

const getCategories = async () => {
  try {
    const response = await fetch(
      "http://www.ipeadata.gov.br/api/odata4/Metadados/"
    );
    const data = await response.json();

    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * data.value.length);
      const option = document.createElement("option");
      option.text = data.value[randomIndex].SERNOME;
      option.value = data.value[randomIndex].SERCODIGO;
      select.appendChild(option);
    }
  } catch (error) {
    result.innerHTML = `<p class="text-danger">Erro na busca de categorias: ${error}</p>`;
  }
};

getCategories();
