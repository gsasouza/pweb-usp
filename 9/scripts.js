const baseUrl = 'https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarPeriodo(dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)';
const period = document.getElementById('period');
const orderBy = document.getElementById('orderBy');
const type = document.getElementById('type');
const typeTable = document.getElementById('table-type');
const content = document.getElementById('content');

const formatDate = (date) => {
  const [day, month, year] = date.toLocaleDateString().split('/');
  return `${month}-${day}-${year}`;
};

const createDaysBeforeDate = (date, daysBefore) => {
  date.setDate(date.getDate() - daysBefore);
  return date;
};

const beatifyType = (value) => `Cotação de ${value.replace('cotacao', '')}`;

const submit = async (event) => {
  event.preventDefault();
  const init = formatDate(createDaysBeforeDate(new Date(), period.value));
  const final = formatDate(createDaysBeforeDate(new Date(), 0));
  const orderByString = `${type.value} ${orderBy.value}`;
  const response = await fetch(`${baseUrl}?@dataInicial='${init}'&@dataFinalCotacao='${final}'&$orderby=${orderByString}&$top=100&$select=${type.value},dataHoraCotacao&$format=json`);
  const result = await response.json();
  result.value.forEach(v => {
    const row = document.createElement('tr');
    const dataHoraText = document.createTextNode(v.dataHoraCotacao);
    const cotacaoText = document.createTextNode(type.value === 'cotacaoVenda' ? v.cotacaoVenda : v.cotacaoCompra);
    const dataHora = document.createElement('td');
    const cotacao = document.createElement('td');
    dataHora.appendChild(dataHoraText);
    cotacao.appendChild(cotacaoText);
    row.appendChild(dataHora);
    row.appendChild(cotacao);
    content.appendChild(row);
  });
};
document.querySelector('form').addEventListener('submit', submit);
type.addEventListener('change', (e) => typeTable.innerHTML = beatifyType(e.target.value));
