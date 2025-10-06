import { Link, useParams, useSearchParams } from "react-router-dom";
import React, { useState } from "react";
import { useEffect} from "react";
import { fetchDeputado, fetchDespesas } from "../api/data";
import Infos from "../components/Infos";


console.log(await fetchDespesas(220714))

function Deputado(){

const [searchParams] = useSearchParams();

const id = searchParams.get("id")

const [data, setData] = useState(null);
const [despesa, setDespesa] = useState(null)
const [error, setError] = useState(null);
const [loading, setLoading] = useState(true);

useEffect(() => {

    const fetchDados = async() =>{
        try{
        const resultDeputado = await fetchDeputado(id);
        const resultDespesas = await fetchDespesas(id)
        setData(resultDeputado.result.dados)
        setDespesa(resultDespesas.result)
        }catch(err){
            setError(err);
        }finally{
            setLoading(false)
        }

    }

    fetchDados();

}, [])


    if (loading) return <p>Por favor Aguarde</p>
    if (error) return <p>{error.message}</p>

    return <>
    
        <Infos urlFoto={data.ultimoStatus.urlFoto} nomeCivil={data.nomeCivil} 
        siglaPartido={data.ultimoStatus.siglaPartido} siglaUf={data.ultimoStatus.siglaUf}
        email={data.ultimoStatus.gabinete.email} situacao={data.ultimoStatus.situacao}
        cpf={data.cpf} sexo={data.sexo} redeSocial={data.redeSocial} escolaridade={data.escolaridade}
        dataNascimento={data.dataNascimento} telefone={data.ultimoStatus.gabinete.telefone} despesas={despesa}/>
        
        
    </>
    
}

export default Deputado;
