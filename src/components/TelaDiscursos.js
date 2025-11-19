import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { startOfMonth, endOfMonth, parseISO, isWithinInterval, startOfDay, endOfDay } from 'date-fns';
import { fetchDiscursos } from "../api/data";
import "./TelaDespesas.css"; // Reutiliza o CSS

const ITEMS_PER_PAGE_LOCAL = 9;

// Função para formatar YYYY-MM-DD
const formatarData = (data) => {
  if (!data) return "";
  const d = new Date(data);
  const ano = d.getFullYear();
  const mes = String(d.getMonth() + 1).padStart(2, '0');
  const dia = String(d.getDate()).padStart(2, '0');
  return `${ano}-${mes}-${dia}`;
};

function TelaDiscursos() {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    
    // Estados de Dados
    const [todosDiscursos, setTodosDiscursos] = useState([]);
    const [discursosExibidos, setDiscursosExibidos] = useState([]);
    
    const [paginaLocal, setPaginaLocal] = useState(1);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // Estados do DatePicker
    const [startDate, setStartDate] = useState(startOfMonth(new Date()));
    const [endDate, setEndDate] = useState(endOfMonth(new Date()));
    const [highlightDates, setHighlightDates] = useState([]);

    // --- 1. BUSCA INTELIGENTE ---
    useEffect(() => {
        const carregarDados = async () => {
            if (!startDate || !endDate) return;

            setLoading(true);
            setError(null);
            
            try {
                const dtInicio = formatarData(startDate);
                const dtFim = formatarData(endDate);

                // A API de discursos retorna tudo para o intervalo
                const result = await fetchDiscursos(id, dtInicio, dtFim);
                
                let listaCompleta = [];
                if (result && result.dados) {
                    listaCompleta = result.dados;
                }

                // Filtragem Local Rigorosa (Garante que está no intervalo exato)
                const start = startOfDay(startDate);
                const end = endOfDay(endDate);

                const filtradosFinal = listaCompleta.filter(d => {
                    if (!d.dataHoraInicio) return true;
                    try {
                        const dataDisc = parseISO(d.dataHoraInicio);
                        return isWithinInterval(dataDisc, { start, end });
                    } catch (err) { return true; }
                });

                // Ordena por data (mais recente primeiro)
                filtradosFinal.sort((a, b) => {
                    return new Date(b.dataHoraInicio) - new Date(a.dataHoraInicio);
                });

                setTodosDiscursos(filtradosFinal);
                
                const dates = filtradosFinal
                    .map(d => d.dataHoraInicio ? parseISO(d.dataHoraInicio) : null)
                    .filter(Boolean);
                setHighlightDates(dates);

                setPaginaLocal(1);

            } catch (err) {
                setError(err);
                console.error("Erro ao buscar discursos:", err);
            } finally {
                setLoading(false);
            }
        };

        carregarDados();
    }, [id, startDate, endDate]);

    // --- 2. PAGINAÇÃO LOCAL ---
    useEffect(() => {
        const inicio = (paginaLocal - 1) * ITEMS_PER_PAGE_LOCAL;
        const fim = inicio + ITEMS_PER_PAGE_LOCAL;
        setDiscursosExibidos(todosDiscursos.slice(inicio, fim));
    }, [paginaLocal, todosDiscursos]);

    const handleDateChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    // Cálculo da Paginação
    const totalPaginasLocais = Math.ceil(todosDiscursos.length / ITEMS_PER_PAGE_LOCAL);
    const getPageNumbers = () => {
      const MAX_BUTTONS = 6;
      if (totalPaginasLocais <= MAX_BUTTONS) return [...Array(totalPaginasLocais).keys()].map(n => n + 1);
      let start = Math.max(1, paginaLocal - 2);
      let end = Math.min(totalPaginasLocais, paginaLocal + 3);
      if (paginaLocal < 4) { start = 1; end = MAX_BUTTONS; } 
      else if (paginaLocal > totalPaginasLocais - 3) { start = totalPaginasLocais - MAX_BUTTONS + 1; end = totalPaginasLocais; } 
      else { start = paginaLocal - 2; end = paginaLocal + 3; }
      const pages = [];
      for (let i = start; i <= end; i++) pages.push(i);
      return pages;
    };
    const pageNumbersToDisplay = getPageNumbers();

    if (loading) return <p style={{textAlign: 'center', padding: '20px'}}>Carregando discursos...</p>;
    if (error) return <p style={{textAlign: 'center', color: 'red'}}>Ocorreu um erro: {error.message}</p>;

    
    return (
        
        <div className="despesas-container">
            <div className="despesas-header">
                <h2>Discursos</h2>
                <div className="filtros-data">
                    <DatePicker
                        selected={startDate}
                        onChange={handleDateChange}
                        startDate={startDate}
                        endDate={endDate}
                        selectsRange
                        isClearable={true}
                        placeholderText="Selecione o intervalo"
                        highlightDates={highlightDates}
                        dateFormat="dd/MM/yyyy"
                        className="date-picker-input"
                    />
                </div>
            </div>

            <div className="despesas-grid">
                {discursosExibidos.length > 0 ? (
                    discursosExibidos.map((discurso, index) => (
                        <div key={discurso.id || index} className="despesa-card">
                            <span className="data">{discurso.dataHoraInicio ? formatarData(discurso.dataHoraInicio) : "Data Indisponível"}</span>
                            <h4>{discurso.tipoDiscurso || "Discurso em Plenário"}</h4>
                            <div className="detalhes">
                                <p><strong>Resumo:</strong> {discurso.resumo || "Sem resumo disponível."}</p>
                                <p><strong>Palavras-chave:</strong> {discurso.keywords || "-"}</p>
                            </div>
                             {discurso.urlAudio && <a href={discurso.urlAudio} target="_blank" rel="noopener noreferrer">Ouvir Áudio →</a>}
                        </div>
                    ))
                ) : (
                    <p style={{gridColumn: "1 / -1", textAlign: "center"}}>Nenhum discurso encontrado para o período selecionado.</p>
                )}
            </div>
            
            {!loading && !error && totalPaginasLocais > 1 && (
                <div className="pagination">
                    <button onClick={() => setPaginaLocal(p => Math.max(p - 1, 1))} disabled={paginaLocal === 1}>&lt;</button>
                    {pageNumbersToDisplay.map(num => (
                        <button key={num} onClick={() => setPaginaLocal(num)} className={paginaLocal === num ? 'active' : ''}>{num}</button>
                    ))}
                    <button onClick={() => setPaginaLocal(p => Math.min(p + 1, totalPaginasLocais))} disabled={paginaLocal === totalPaginasLocais}>&gt;</button>
                </div>
            )}
        </div>
    );
}

export default TelaDiscursos;