import { useEffect, useState } from "react";
import { fetchDespesas } from "../api/data";
import { useSearchParams } from "react-router-dom";
import Despesas from "./Despesas";
import "./TelaDespesas.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
    
    // Mostra mensagens de carregamento ou erro
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
                                <p><strong>CNPJ do Fornecedor:</strong> {despesa.cnpjCpfFornecedor}</p>
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
                    {[...Array(ultimaPagina).keys()].map(num => (
                        <button key={num + 1} onClick={() => setPagina(num + 1)} className={pagina === num + 1 ? 'active' : ''}>
                            {num + 1}
                        </button>
                    ))}
                    <button onClick={() => setPagina(p => Math.min(p + 1, ultimaPagina))} disabled={pagina === ultimaPagina}>&gt;</button>
                </div>
            )}
        </div>
    );
}

export default TelaDespesas;

