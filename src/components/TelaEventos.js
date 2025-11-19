import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { startOfMonth, endOfMonth, parseISO, isWithinInterval, startOfDay, endOfDay } from 'date-fns';
import { fetchEventos } from "../api/data";
import "./TelaDespesas.css"; // Reutiliza o CSS para manter o padrão visual

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

function TelaEventos() {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    
    // Estados de Dados
    const [todosEventos, setTodosEventos] = useState([]);
    const [eventosExibidos, setEventosExibidos] = useState([]);
    
    const [paginaLocal, setPaginaLocal] = useState(1);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // Estados do DatePicker
    const [startDate, setStartDate] = useState(startOfMonth(new Date()));
    const [endDate, setEndDate] = useState(endOfMonth(new Date()));
    const [highlightDates, setHighlightDates] = useState([]);

    // --- 1. BUSCA INTELIGENTE (Busca todas as páginas da API para o intervalo) ---
    useEffect(() => {
        const carregarDados = async () => {
            if (!startDate || !endDate) return;

            setLoading(true);
            setError(null);
            
            try {
                const dtInicio = formatarData(startDate);
                const dtFim = formatarData(endDate);

                // Passo 1: Buscar a primeira página para saber o total
                const res1 = await fetchEventos(id, dtInicio, dtFim, 1);
                
                let listaCompleta = [];
                
                if (res1 && res1.result) {
                    // Assumindo que a API retorna [lista, totalPaginas] como em Despesas
                    listaCompleta = res1.result[0] || [];
                    const totalPaginasAPI = res1.result[1] || 1;

                    // Passo 2: Buscar páginas restantes em paralelo
                    if (totalPaginasAPI > 1) {
                        const promises = [];
                        const maxPages = Math.min(totalPaginasAPI, 20); // Limite de segurança
                        
                        for (let p = 2; p <= maxPages; p++) {
                            promises.push(fetchEventos(id, dtInicio, dtFim, p));
                        }
                        const responses = await Promise.all(promises);
                        responses.forEach(r => {
                            if (r && r.result) {
                                listaCompleta = [...listaCompleta, ...r.result[0]];
                            }
                        });
                    }
                }

                // Passo 3: Deduplicação (segurança contra a API)
                const uniqueEventos = [];
                const seenIds = new Set();
                listaCompleta.forEach(evt => {
                    // Usa ID ou uma chave composta se ID não existir
                    const key = evt.id || `${evt.dataHoraInicio}-${evt.descricao}`;
                    if (!seenIds.has(key)) {
                        seenIds.add(key);
                        uniqueEventos.push(evt);
                    }
                });

                // Passo 4: Filtragem Local Rigorosa (Garante que está no intervalo exato)
                const start = startOfDay(startDate);
                const end = endOfDay(endDate);

                const filtradosFinal = uniqueEventos.filter(e => {
                    if (!e.dataHoraInicio) return true;
                    try {
                        const dataEvt = parseISO(e.dataHoraInicio);
                        return isWithinInterval(dataEvt, { start, end });
                    } catch (err) { return true; }
                });

                setTodosEventos(filtradosFinal);
                
                // Atualiza destaques no calendário
                const dates = filtradosFinal
                    .map(e => e.dataHoraInicio ? parseISO(e.dataHoraInicio) : null)
                    .filter(Boolean);
                setHighlightDates(dates);

                setPaginaLocal(1);

            } catch (err) {
                setError(err);
                console.error("Erro ao buscar eventos:", err);
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
        setEventosExibidos(todosEventos.slice(inicio, fim));
    }, [paginaLocal, todosEventos]);

    const handleDateChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    // Cálculo da Paginação
    const totalPaginasLocais = Math.ceil(todosEventos.length / ITEMS_PER_PAGE_LOCAL);
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

    return (
        <div className="despesas-container">
            <div className="despesas-header">
                <h2>Próximos Eventos</h2>
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

            {loading ? (
                <p style={{textAlign: 'center', padding: '20px'}}>Carregando eventos...</p>
            ) : error ? (
                <p style={{textAlign: 'center', color: 'red'}}>Ocorreu um erro: {error.message}</p>
            ) : (
                <div className="despesas-grid">
                    {eventosExibidos.length > 0 ? (
                        eventosExibidos.map((evento, index) => (
                            <div key={evento.id || index} className="despesa-card">
                                <span className="data">{evento.dataHoraInicio ? formatarData(evento.dataHoraInicio) : "Data Indisponível"}</span>
                                <h4>{evento.descricaoTipo}</h4>
                                <div className="detalhes">
                                    <p><strong>Descrição:</strong> {evento.descricao || "Sem descrição."}</p>
                                    <p><strong>Local:</strong> {evento.localCamara ? evento.localCamara.nome : "Local não informado"}</p>
                                    <p><strong>Situação:</strong> {evento.situacao || "-"}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p style={{gridColumn: "1 / -1", textAlign: "center"}}>Nenhum evento encontrado para o período selecionado.</p>
                    )}
                </div>
            )}
            
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

export default TelaEventos;