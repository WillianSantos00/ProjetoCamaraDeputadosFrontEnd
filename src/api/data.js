import axios from "axios";

const Urldeputado = "http://localhost:3000/api/v1/deputados/";
const Urlgemini = "http://localhost:3000/api/v1/gemini/";



const dados = axios.get(Urldeputado)
  .then(function (response) {
    return response.data
  })
  .catch(function (error) {
    console.log(error);
  })

 
const dadosResumo = await dados;


export async function fetchDeputado(id) {
  try {
    const response = await axios.get(Urldeputado+id
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchDespesas(id, pagina=1) {
  try {
    const response = await axios.post(Urldeputado+id+"/despesas"
    , {
      pagina:pagina 
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchResumoIA(id) {
  try {
    const response = await axios.get(Urlgemini+"resumoGeralDeputado/"+id
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchResumoDespesas(id) {
  try {
    const response = await axios.get(Urlgemini+"resumoDespesas/"+id
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchResumoDiscursos(id) {
  try {
    const response = await axios.get(Urlgemini+"resumoDiscursos/"+id
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchResumoEventos(id) {
  try {
    const response = await axios.get(Urlgemini+"resumoEventos/"+id
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchResumoHistorico(id) {
  try {
    const response = await axios.get(Urlgemini+"resumoHistorico/"+id
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}


export default dadosResumo


