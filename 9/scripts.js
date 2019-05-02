const ul = document.querySelector('ul');
const baseUrl = 'https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarPeriodo(dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)';
const period = document.getElementById('period');
const orderBy = document.getElementById('orderBy');
const type = document.getElementById('type');

const formatDate = (date) => {
  const [day, month, year] = date.toLocaleDateString().split('/');
  return `${month}-${day}-${year}`;
};
const createDaysBeforeDate = (date, daysBefore) => {
  date.setDate(date.getDate() - daysBefore);
  return date;
};

const submit = async (event) => {
  event.preventDefault();
  const init = formatDate(createDaysBeforeDate(new Date(), period.value));
  const final = formatDate(createDaysBeforeDate(new Date(), 0));
  console.log(type);
  const orderByString = `${type.value} ${orderBy.value}`;
  const response = await fetch(`${baseUrl}?@dataInicial='${init}'&@dataFinalCotacao='${final}'&$orderby=${orderByString}&$top=100&$select=${type.value},dataHoraCotacao&$format=json`);
  const result = await response.json();
  ul.innerHTML = result.value.map(v => `<li> ${JSON.stringify(v)} </li>`);
};
document.querySelector('form').addEventListener('submit', submit);

