<<<<<<< HEAD
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


=======
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchDespesas } from "../api/data"; // Supondo que esta função exista
import "./TelaDespesas.css";

function TelaDespesas() {
    // Hooks para gerenciar o estado da página
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    
    const [despesas, setDespesas] = useState([]);
    const [ultimaPagina, setUltimaPagina] = useState(1);
    const [pagina, setPagina] = useState(1);
    const [ano, setAno] = useState("");
    const [mes, setMes] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    // Efeito para buscar os dados sempre que a página, mês ou ano mudarem
    useEffect(() => {
        const fetchDados = async () => {
            setLoading(true);
            try {
                const result = await fetchDespesas(id, pagina, ano, mes);
                if (result && result.result) {
                    setDespesas(result.result[0] || []);
                    setUltimaPagina(result.result[1] || 1);
                } else {
                    setDespesas([]); // Garante que despesas seja um array em caso de não haver dados
                }
            } catch (err) {
                setError(err);
                console.error("Erro ao buscar despesas:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchDados();
    }, [id, pagina, mes, ano]);

    // Lógica para gerar os anos disponíveis para o filtro
    const listaAnos = [];
    const anoAtual = new Date().getFullYear();
    for (let i = anoAtual; i >= anoAtual - 4; i--) {
        listaAnos.push(i);
    }

    // Funções para lidar com a mudança nos filtros
    const handleAnoChange = (event) => {
        setAno(event.target.value);
        setPagina(1); // Reseta para a primeira página
    };

    const handleMesChange = (event) => {
        setMes(event.target.value);
        setPagina(1); // Reseta para a primeira página
    };
    
    // --- LÓGICA DE PAGINAÇÃO (LIMITE 6) ---
    const getPageNumbers = () => {
      const MAX_PAGES = 6;
      const total = ultimaPagina;
      const current = pagina;
      
      if (total <= MAX_PAGES) {
          // Se o total for 6 ou menos, mostra todos
          return [...Array(total).keys()].map(n => n + 1);
      }

      // Lógica de janela deslizante
      let start = Math.max(1, current - 2);
      let end = Math.min(total, current + 3);

      if (current < 4) {
          // Perto do início
          start = 1;
          end = MAX_PAGES;
      } else if (current > total - 3) {
          // Perto do fim
          start = total - MAX_PAGES + 1;
          end = total;
      } else {
          // No meio (ex: 3, 4, [5], 6, 7, 8)
          start = current - 2;
          end = current + 3;
      }
      
      const pages = [];
      for (let i = start; i <= end; i++) {
          pages.push(i);
      }
      return pages;
    };

    const pageNumbersToDisplay = getPageNumbers();
    // --- FIM DA LÓGICA DE PAGINAÇÃO ---

    if (loading) return <p>Carregando despesas, por favor aguarde...</p>;
    if (error) return <p>Ocorreu um erro ao carregar as despesas: {error.message}</p>;

    return (
        <div className="despesas-container">
            <div className="despesas-header">
                <h2>Despesas</h2>
                <div className="filtros">
                    <select value={mes} onChange={handleMesChange}>
                        <option value="">Mês</option>
                        <option value="1">Janeiro</option>
                        <option value="2">Fevereiro</option>
                        <option value="3">Março</option>
                        <option value="4">Abril</option>
                        <option value="5">Maio</option>
                        <option value="6">Junho</option>
                        <option value="7">Julho</option>
                        <option value="8">Agosto</option>
                        <option value="9">Setembro</option>
                        <option value="10">Outubro</option>
                        <option value="11">Novembro</option>
                        <option value="12">Dezembro</option>
                    </select>
                    <select value={ano} onChange={handleAnoChange}>
                        <option value="">Ano</option>
                        {listaAnos.map((item) => <option key={item} value={item}>{item}</option>)}
                    </select>
                </div>
            </div>

            {/* Renderiza os cards de despesa */}
            <div className="despesas-grid">
                {despesas.length > 0 ? (
                    despesas.map((despesa, index) => (
                        <div key={index} className="despesa-card">
                            <span className="data">{despesa.dataDocumento || `${despesa.mes}/${despesa.ano}`}</span>
                            <h4>{despesa.nomeFornecedor}</h4>
                            <div className="detalhes">
                                <p><strong>Código:</strong> {despesa.codDocumento}</p>
                                <p><strong>Tipo de Documento:</strong> {despesa.tipoDocumento}</p>
                                <p><strong>Valor:</strong> R$ {parseFloat(despesa.valorDocumento).toFixed(2)}</p>
                                <p><strong>Tipo de Despesa:</strong> {despesa.tipoDespesa}</p>
                                <p><strong>CNPJ:</strong> {despesa.cnpjCpfFornecedor}</p>
                                <p><strong>Parcela:</strong> {despesa.parcela}</p>
                            </div>
                            <a href={despesa.urlDocumento} target="_blank" rel="noopener noreferrer">Ver documento →</a>
                        </div>
                    ))
                ) : (
                    <p>Nenhuma despesa encontrada para os filtros selecionados.</p>
                )}
            </div>
            
            {/* Paginação dinâmica */}
            {ultimaPagina > 1 && (
                <div className="pagination">
                    <button onClick={() => setPagina(p => Math.max(p - 1, 1))} disabled={pagina === 1}>&lt;</button>
                    {pageNumbersToDisplay.map(num => (
                        <button key={num} onClick={() => setPagina(num)} className={pagina === num ? 'active' : ''}>
                            {num}
                        </button>
                    ))}
                    <button onClick={() => setPagina(p => Math.min(p + 1, ultimaPagina))} disabled={pagina === ultimaPagina}>&gt;</button>
                </div>
            )}
        </div>
    );
>>>>>>> origin/front1versao
}

export default TelaDespesas;