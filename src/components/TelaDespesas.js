import { useEffect, useState } from "react";
import { fetchDespesas } from "../api/data";
import { useSearchParams } from "react-router-dom";
import Despesas from "./Despesas";
import "./TelaDespesas.css"

function TelaDespesas(){

    const [searchParams] = useSearchParams();
    const id = searchParams.get("id")

const [despesa, setDespesa] = useState(null);
const [ultimaPagina, setUltimaPagina] = useState(true);
const [pagina, setPagina] = useState(1)
const [error, setError] = useState(null);
const [loading, setLoading] = useState(true);


useEffect(() => {

    const fetchDados = async() =>{
        try{ 
        const resultDespesas = await fetchDespesas(id, pagina);
        setDespesa(resultDespesas.result[0]);
        setUltimaPagina(resultDespesas.result[1])
        }catch(err){
            setError(err);
        }finally{
            setLoading(false)
        }

    }

    fetchDados();

}, [pagina])

 if (loading){
        return <p>Por favor Aguarde</p> 
    }
if (error) return <p>{error.message}</p>

const listaPaginas = []
    function contaPaginas(){
        for(var i=1; i<=ultimaPagina; i++){
            listaPaginas.push(i)
        }
    }

    contaPaginas()

    const handleChangePagina = (event) =>{
    setPagina(event.target.value);
  }

    return <>

        <div>
        {despesa.map((item) => <Despesas ano={item.ano} mes={item.mes} 
        tipoDespesa={item.tipoDespesa} codDocumento={item.codDocumento} 
        tipoDocumento={item.tipoDocumento} dataDocumento={item.dataDocumento}
        valorDocumento={item.valorDocumento} urlDocumento={item.urlDocumento}
        nomeFornecedor={item.nomeFornecedor} cnpjFornecedor={item.cnpjCpfFornecedor}
        valorLiquido={item.valorLiquido} valorGlosa={item.valorGlosa}
        numRessarcimento={item.numRessarcimento} parcela={item.parcela} ultimaPagina={ultimaPagina}/>)}
        </div>
        <div>
        <ul className="paginasDespesas">
            {listaPaginas.map((item)=> <li value={item} className="itensPg" onClick={handleChangePagina} style={{color: item == pagina ? 'blue': '', fontWeight:item == pagina ? 'bold': '' }}>{item}</li>)}
        </ul>
        </div>

    </>


}

export default TelaDespesas;