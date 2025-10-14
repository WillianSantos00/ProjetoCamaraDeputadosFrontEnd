import { useEffect, useState } from "react";
import { fetchDespesas } from "../api/data";
import { useSearchParams } from "react-router-dom";
import Despesas from "./Despesas";
import "./TelaDespesas.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function TelaDespesas(){

    const [searchParams] = useSearchParams();
    const id = searchParams.get("id")
    

const [despesa, setDespesa] = useState(null);
const [ultimaPagina, setUltimaPagina] = useState(true);
const [pagina, setPagina] = useState(1);
const [ano, setAno] = useState("");
const [mes, setMes] = useState("");
const [error, setError] = useState(null);
const [loading, setLoading] = useState(true);



useEffect(() => {

    const fetchDados = async() =>{
        try{
        const resultDespesas = await fetchDespesas(id, pagina, ano, mes);
        if(resultDespesas != null){
        setDespesa(resultDespesas.result[0]);
        setUltimaPagina(resultDespesas.result[1])
        }
        }catch(err){
            setError(err);
        }finally{
            setLoading(false)
        }

    }

    fetchDados();

}, [pagina, mes, ano]);


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

 
            var listaAnos = [];
            const anoAtual = parseInt(new Date().getFullYear())
            for(var i=anoAtual; i>=anoAtual-4; i--){
                listaAnos.push(i)
            }
           
            const handleAnoChange = (event) =>{
        setAno(event.target.value);
        }

            const handleMesChange = (event) =>{
        setMes(event.target.value);
        }

    return <>
        <div className="SelecaoAnoMes">
            
            <select className="selectAno" onChange={handleAnoChange}>
                <option value={""} >Selecione o ano</option>
                {listaAnos.map((item)=> <option value={item}>{item}</option>)}
            </select>
            <select className="selectMes" onChange={handleMesChange}>
                <option value={""}>Selecione o mês</option>
                <option value={1}>Janeiro</option>
                <option value={2}>Fevereiro</option>
                <option value={3}>Março</option>
                <option value={4}>Abril</option>
                <option value={5}>Maio</option>
                <option value={6}>Junho</option>
                <option value={7}>Julho</option>
                <option value={8}>Agosto</option>
                <option value={9}>Setembro</option>
                <option value={10}>Outubro</option>
                <option value={11}>Novembro</option>
                <option value={12}>Dezembro</option>
            </select>

        </div>
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
            {listaPaginas.map((item)=> <li value={item} className="itensPg" onClick={handleChangePagina} style={{color: item === pagina ? 'blue': '', fontWeight:item === pagina ? 'bold': '' }}>{item}</li>)}
        </ul>
        </div>

    </>


}

export default TelaDespesas;