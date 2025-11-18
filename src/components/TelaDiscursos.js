import { useEffect, useState } from "react";
<<<<<<< HEAD

import { useSearchParams } from "react-router-dom";
import { fetchDiscursos } from "../api/data";
import DatePicker from "react-datepicker";
import Discursos from "./Discursos";

function TelaDiscursos(){
const [searchParams] = useSearchParams();
const id = searchParams.get("id");
const [discurso, setDiscurso] = useState(null);
const [pagina, setPagina] = useState(1);
const [ultimaPagina, setUltimaPagina] = useState(true);
const [dateRange, setDateRange] = useState("");
const [startDate, setStartDate] = useState(new Date());
const [endDate, setEndDate] = useState(null);
const [startDateFormatada, setStartDateFormatada] = useState("");
const [endDateFormatada, setEndDateFormatada] = useState("");
const [error, setError] = useState(null);
const [loading, setLoading] = useState(true);


    useEffect(() => {
    
        const fetchDados = async() =>{
            try{
            const resultDiscurso = await fetchDiscursos(id, startDateFormatada, endDateFormatada);
            if(resultDiscurso != null || resultDiscurso != []){
            setDiscurso(resultDiscurso.result);
            //setUltimaPagina(resultDiscurso.result[1])
            }
            }catch(err){
                setError(err);
            }finally{
                setLoading(false)
            }
    
        }
    
        fetchDados();
    
    }, [pagina, endDateFormatada, startDateFormatada]);

    useEffect(()=>{
    if(startDate && endDate){
    setDateRange(`Selected date range: ${startDate.toDateString()} - ${endDate.toDateString()}`)
  }else if(`Select start date: ${startDate.toDateString()}`){

  }else{
    setDateRange("");
  }

},[startDate, endDate])

 useEffect(()=>{

    const startDateString = startDate.toLocaleDateString('pt-br');
    const data = startDateString.replace(/\//g, '-');
    let dataInvertida = data.split('-').reverse().join('-');
    setStartDateFormatada(dataInvertida);
    


  },[startDate])

  useEffect(()=>{
    if(endDate != null){
    const endDateString = endDate.toLocaleDateString('pt-br');
    const data = endDateString.replace(/\//g, '-');
    let dataInvertida = data.split('-').reverse().join('-');
    setEndDateFormatada(dataInvertida);
    
    }else{
        setEndDateFormatada("")
    }
    

  },[endDate]);

  const onChangeDate = (dates) =>{
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  }
    
    if (loading){
        return <p>Por favor Aguarde</p> 
    }
    if (error) return <p>{error.message}</p>
    

    
    return(
        
    <div className="TelaDiscursos-container">
        <center><DatePicker
        selected={startDate}
            onChange={onChangeDate}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            inline
            />
            </center>
        <br />
        
         {discurso.map((item) => <Discursos dataHoraInicio={item.dataHoraInicio}
         dataHoraFim={item.dataHoraFim} titulo={item.faseEvento.titulo} 
         tipoDiscurso={item.tipoDiscurso} sumario={item.sumario} 
         transcricao={item.transcricao}/>)}
       
    </div>
    )
   
}

export default TelaDiscursos
=======
import { useSearchParams } from "react-router-dom";
import { fetchDiscursos } from "../api/data"; // Busca discursos
import "./TelaDespesas.css"; // Usa o mesmo CSS de Despesas para padronizar

function TelaDiscursos() {
    // Hooks para gerenciar o estado da página
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    
    const [discursos, setDiscursos] = useState([]); // Estado para discursos
    const [ultimaPagina, setUltimaPagina] = useState(1);
    const [pagina, setPagina] = useState(1);
    const [ano, setAno] = useState("");
    const [mes, setMes] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDados = async () => {
            setLoading(true);
            try {
                // Chama a função fetchDiscursos com os filtros corretos
                const result = await fetchDiscursos(id, pagina, ano, mes);
                if (result && result.result) {
                    setDiscursos(result.result[0] || []); // Define os discursos
                    setUltimaPagina(result.result[1] || 1);
                } else {
                    setDiscursos([]);
                }
            } catch (err) {
                setError(err);
                console.error("Erro ao buscar discursos:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchDados();
    }, [id, pagina, mes, ano]);

    // Lógica para gerar os anos disponíveis
    const listaAnos = [];
    const anoAtual = new Date().getFullYear();
    for (let i = anoAtual; i >= anoAtual - 4; i--) {
        listaAnos.push(i);
    }

    const handleAnoChange = (event) => {
        setAno(event.target.value);
        setPagina(1);
    };

    const handleMesChange = (event) => {
        setMes(event.target.value);
        setPagina(1);
    };
    
    // --- LÓGICA DE PAGINAÇÃO (LIMITE 6) ---
    const getPageNumbers = () => {
      const MAX_PAGES = 6;
      const total = ultimaPagina;
      const current = pagina;
      
      if (total <= MAX_PAGES) {
          return [...Array(total).keys()].map(n => n + 1);
      }

      let start = Math.max(1, current - 2);
      let end = Math.min(total, current + 3);

      if (current < 4) {
          start = 1;
          end = MAX_PAGES;
      } else if (current > total - 3) {
          start = total - MAX_PAGES + 1;
          end = total;
      } else {
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

    if (loading) return <p>Carregando discursos, por favor aguarde...</p>;
    if (error) return <p>Ocorreu um erro ao carregar os discursos: {error.message}</p>;

    return (
        <div className="despesas-container">
            <div className="despesas-header">
                <h2>Discursos</h2>
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

            <div className="despesas-grid">
                {discursos.length > 0 ? (
                    discursos.map((discurso, index) => (
                        <div key={discurso.id || index} className="despesa-card">
                            <span className="data">{discurso.dataHoraInicio || "Data não disponível"}</span>
                            <h4>Resumo do Discurso</h4>
                            <div className="detalhes">
                                <p>{discurso.resumo || "Resumo não disponível."}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Nenhum discurso encontrado para os filtros selecionados.</p>
                )}
            </div>
            
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
}

export default TelaDiscursos;
>>>>>>> origin/front1versao
