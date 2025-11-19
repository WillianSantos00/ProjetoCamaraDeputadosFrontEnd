import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { startOfMonth, endOfMonth, parseISO, isWithinInterval, addMonths, isBefore, startOfDay, endOfDay, subMonths } from 'date-fns';
import { fetchDespesas } from "../api/data";
import "./TelaDespesas.css";

// Quantidade de itens por página na paginação local
const ITEMS_PER_PAGE_LOCAL = 9; 

function TelaDespesas() {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    
    // Estado para armazenar TODAS as despesas filtradas do intervalo
    const [todasDespesasFiltradas, setTodasDespesasFiltradas] = useState([]);
    // Estado para as despesas que aparecem na página atual
    const [despesasExibidas, setDespesasExibidas] = useState([]);
    
    const [paginaLocal, setPaginaLocal] = useState(1);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // Estados do DatePicker - INICIAM VAZIOS PARA MOSTRAR "TODOS" (RECENTES)
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [highlightDates, setHighlightDates] = useState([]);

    // --- 1. BUSCA E FILTRAGEM ---
    useEffect(() => {
        const carregarDados = async () => {
            // LÓGICA HÍBRIDA:
            // 1. Se o usuário selecionou APENAS o início, aguarda o fim (não busca ainda).
            if (startDate && !endDate) return;

            // 2. Definição do Intervalo de Busca:
            // Se as datas estiverem vazias (estado inicial), busca os últimos 6 meses.
            // Se estiverem preenchidas, usa a seleção do usuário.
            const buscaInicio = startDate || subMonths(new Date(), 6);
            const buscaFim = endDate || new Date();

            setLoading(true);
            setError(null);
            
            try {
                let listaBruta = [];
                
                // Itera por cada mês dentro do intervalo definido
                let currentMonth = startOfMonth(buscaInicio);
                const lastMonth = startOfMonth(buscaFim);

                // Proteção contra loop infinito e limite de segurança
                let monthsCount = 0;
                while ((isBefore(currentMonth, lastMonth) || currentMonth.getTime() === lastMonth.getTime()) && monthsCount < 12) {
                    const anoAPI = currentMonth.getFullYear();
                    const mesAPI = currentMonth.getMonth() + 1;

                    // Busca a primeira página do mês
                    const res1 = await fetchDespesas(id, 1, anoAPI, mesAPI);
                    
                    if (res1 && res1.result) {
                        const dadosPagina1 = res1.result[0] || [];
                        const totalPaginasAPI = res1.result[1] || 1;
                        
                        listaBruta = [...listaBruta, ...dadosPagina1];

                        // Busca páginas restantes se houver
                        if (totalPaginasAPI > 1) {
                            const promises = [];
                            const maxPagesToFetch = Math.min(totalPaginasAPI, 20); 
                            
                            for (let p = 2; p <= maxPagesToFetch; p++) {
                                promises.push(fetchDespesas(id, p, anoAPI, mesAPI));
                            }
                            const responses = await Promise.all(promises);
                            responses.forEach(r => {
                                if (r && r.result) {
                                    listaBruta = [...listaBruta, ...r.result[0]];
                                }
                            });
                        }
                    }
                    currentMonth = addMonths(currentMonth, 1);
                    monthsCount++;
                }

                // --- DEDUPLICAÇÃO ---
                const uniqueExpenses = [];
                const seenIds = new Set();
                
                listaBruta.forEach(item => {
                    const uniqueKey = `${item.codDocumento}-${item.dataDocumento}-${item.valorDocumento}`;
                    if (!seenIds.has(uniqueKey)) {
                        seenIds.add(uniqueKey);
                        uniqueExpenses.push(item);
                    }
                });

                // --- FILTRAGEM POR DATA ---
                // Só filtra rigorosamente se o usuário tiver selecionado um intervalo.
                // Se for o carregamento inicial (automático), mostramos tudo o que veio dos meses buscados.
                let filtradas = uniqueExpenses;

                if (startDate && endDate) {
                    const start = startOfDay(startDate);
                    const end = endOfDay(endDate);

                    filtradas = uniqueExpenses.filter(d => {
                        if (!d.dataDocumento) return true; 
                        try {
                            const dataDespesa = parseISO(d.dataDocumento);
                            return isWithinInterval(dataDespesa, { start, end });
                        } catch (e) { return true; }
                    });
                }

                // Ordena por data (mais recente primeiro)
                filtradas.sort((a, b) => {
                    if (!a.dataDocumento) return 1;
                    if (!b.dataDocumento) return -1;
                    return new Date(b.dataDocumento) - new Date(a.dataDocumento);
                });

                setTodasDespesasFiltradas(filtradas);
                
                // Atualiza destaques
                const dates = filtradas
                    .map(d => d.dataDocumento ? parseISO(d.dataDocumento) : null)
                    .filter(d => d !== null);
                setHighlightDates(dates);

                setPaginaLocal(1);

            } catch (err) {
                setError(err);
                console.error("Erro ao buscar despesas:", err);
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
        setDespesasExibidas(todasDespesasFiltradas.slice(inicio, fim));
    }, [paginaLocal, todasDespesasFiltradas]);

    // Handler do Calendário
    const handleDateChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    // Cálculo dos botões de paginação
    const totalPaginasLocais = Math.ceil(todasDespesasFiltradas.length / ITEMS_PER_PAGE_LOCAL);
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
                <h2>Despesas</h2>
                <div className="filtros-data">
                    <DatePicker
                        selected={startDate}
                        onChange={handleDateChange}
                        startDate={startDate}
                        endDate={endDate}
                        selectsRange
                        isClearable={true}
                        placeholderText="Filtrar por data (Padrão: Últimos 6 meses)"
                        highlightDates={highlightDates}
                        dateFormat="dd/MM/yyyy"
                        className="date-picker-input"
                    />
                </div>
            </div>

            {loading ? (
                <p style={{textAlign: 'center', padding: '20px'}}>Carregando despesas...</p>
            ) : error ? (
                <p style={{textAlign: 'center', color: 'red'}}>Ocorreu um erro: {error.message}</p>
            ) : (
                <div className="despesas-grid">
                    {despesasExibidas.length > 0 ? (
                        despesasExibidas.map((despesa, index) => (
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
                        <p style={{gridColumn: "1 / -1", textAlign: "center"}}>Nenhuma despesa encontrada para o período selecionado.</p>
                    )}
                </div>
            )}
            
            {!loading && totalPaginasLocais > 1 && (
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

export default TelaDespesas;