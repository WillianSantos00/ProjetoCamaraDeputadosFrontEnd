import axios from "axios";

const URL = "https://dadosabertos.camara.leg.br/api/v2/deputados";


const dados = axios.get(URL)
  .then(function (response) {
    return response.data
  })
  .catch(function (error) {
    console.log(error);
  })

 
const dadosResumo = await dados;

const deputado = (dadosResumo.dados).map(({id, nome, siglaPartido, siglaUf, urlFoto}) => 
    ({id, nome, siglaPartido, siglaUf, urlFoto}))



export async function fetchDeputado(id) {
  try {
    const response = await axios.get(URL+'/'+id
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchDespesas(id, mes="") {
  try {
    const response = await axios.get(URL+'/'+id+"/despesas"+mes
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}



export default deputado


