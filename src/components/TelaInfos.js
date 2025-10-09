import { useSearchParams } from "react-router-dom";
import React, { useState, useEffect, lazy, Suspense } from "react";
import { fetchDeputado, fetchDespesas, fetchResumoIA } from "../api/data";
import Infos from "../components/Infos";
import AIButton from "../components/AIButton";
const ResumoIA = lazy(() => import('../components/ResumoIA'));

function Loading() {
  return <h2>Carregando Resumo...</h2>;
}


function TelaInfos(){

const [searchParams] = useSearchParams();

const id = searchParams.get("id")

const [data, setData] = useState(null);

const [resumoIA, setResumoIA] = useState(null);
const [error, setError] = useState(null);
const [loading, setLoading] = useState(true);
const [loadResumo, setLoadResumo] = useState(false)

useEffect(() => {

    const fetchDados = async() =>{
        try{
        const resultDeputado = await fetchDeputado(id);
        
        setData(resultDeputado.result.dados);
        }catch(err){
            setError(err);
        }finally{
            setLoading(false)
        }

    }

    fetchDados();

}, [])

useEffect(() => {

    const fetchResumoGeral = async() =>{
        try{
        const resultResumoIA = await fetchResumoIA(id);
        setResumoIA(resultResumoIA.resumo)
        }catch(err){
            setError(err);
        }finally{
            setLoading(false)
        }

    }

    fetchResumoGeral();

}, [setResumoIA])



    if (loading){
        return <p>Por favor Aguarde</p> 
    }
    if (error) return <p>{error.message}</p>

    return <>
    
        <Infos urlFoto={data.ultimoStatus.urlFoto} nomeCivil={data.nomeCivil} 
        siglaPartido={data.ultimoStatus.siglaPartido} siglaUf={data.ultimoStatus.siglaUf}
        email={data.ultimoStatus.gabinete.email} situacao={data.ultimoStatus.situacao}
        cpf={data.cpf} sexo={data.sexo} redeSocial={data.redeSocial} escolaridade={data.escolaridade}
        dataNascimento={data.dataNascimento} telefone={data.ultimoStatus.gabinete.telefone}/>
        <Suspense fallback={<Loading />}>
            <h3><ResumoIA resumoIA={resumoIA}/></h3>
        </Suspense>
        
        
        
    </>
    
}



export default TelaInfos;