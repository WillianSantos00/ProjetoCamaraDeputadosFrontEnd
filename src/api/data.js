import axios from "axios";

const Urldeputado = "http://localhost:3000/api/v1/deputados/";
const Urlgemini = "http://localhost:3000/api/v1/gemini/";
const UrlUsuario = "http://localhost:3000/api/v1/usuario";



export async function fetchDadosResumo() {
  try {
    const response = await axios.get(Urldeputado);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar dados resumo:", error);
    
    return { deputados: [] }; 
  }
}


export async function fetchDeputado(id) {
  try {
    const response = await axios.get(Urldeputado+id
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchDespesas(id, pagina=1, ano, mes) {
  try {
    const response = await axios.post(Urldeputado+id+"/despesas"
    , {
      ano: ano,
      mes: mes,
      pagina:pagina      
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchDiscursos(id, dtInicio, dtFim) {
  try {
    const response = await axios.post(Urldeputado+id+"/discursos"
    , {
         dtInicio: dtInicio,
         dtFim: dtFim
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchEventos(id, dtInicio, dtFim, pagina) {
  try {
    const response = await axios.post(Urldeputado+id+"/eventos"
    , {
         dtInicio: dtInicio,
         dtFim: dtFim,
         pagina: pagina
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

export async function fetchCadastro(email, telefone) {

  try{
    const response = await axios.post(UrlUsuario
    , {
         email: email,
         telefone: telefone
    });
    return response.status;
  }catch(error){
    console.error(error)
  }
  
}


