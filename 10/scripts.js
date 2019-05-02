const baseUrl = 'https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)';
const date = document.getElementById('date');
const content = document.getElementById('content');

const formatDate = (dateValue) => {
  const [year, month, day] = dateValue.split('-');
  return `${month}-${day}-${year}`;
};

const createButton = (row) => {
  const excludeButton = document.createElement('button');
  excludeButton.appendChild(document.createTextNode('Excluir'));
  excludeButton.onclick = () => content.removeChild(row);
  return excludeButton;
};

const createRow = (data) => {
  const row = document.createElement('tr');
  row.id = data.dataHoraCotacao;
  return row;
};

const createRowColumn = (data, property, row) => {
  const text = document.createTextNode(data[property]);
  const td = document.createElement('td');
  td.appendChild(text);
  row.appendChild(td);
};

const submit = async (event) => {
  event.preventDefault();
  const response = await fetch(`${baseUrl}?@dataCotacao='${formatDate(date.value)}'&$top=100&$format=json`);
  const result = await response.json();
  result.value.forEach(v => {
    const row = createRow(v);
    const excludeButton = createButton(row);
    createRowColumn(v, 'dataHoraCotacao', row);
    createRowColumn(v, 'cotacaoVenda', row);
    createRowColumn(v, 'cotacaoCompra', row);
    row.appendChild(excludeButton);
    content.appendChild(row);
  });
};
document.querySelector('form').addEventListener('submit', submit);
