import axios from "axios";

const URL = "http://localhost:3000/api/v1/deputados/";


const dados = axios.get(URL)
  .then(function (response) {
    return response.data
  })
  .catch(function (error) {
    console.log(error);
  })

 
const dadosResumo = await dados;


export async function fetchDeputado(id) {
  try {
    const response = await axios.get(URL+id
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchDespesas(id) {
  try {
    const response = await axios.post(URL+id+"/despesas"
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}



export default dadosResumo


