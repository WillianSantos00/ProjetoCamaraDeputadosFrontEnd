import React, { useState, useEffect, Suspense, lazy } from "react";
import { useSearchParams, Link } from "react-router-dom"; 
import "./PgDeputado.css";

// --- API ---
import { 
  fetchDeputado, 
  fetchResumoDespesas, 
  fetchResumoDiscursos, 
  fetchResumoEventos,
  fetchResumoHistorico 
} from "../api/data";

// --- Componentes ---
import NavBar from "../components/NavBar";
import HeaderDeputado from "../components/HeaderDeputado";
import AIButton from "../components/AIButton"; 
import Footer from "../components/Footer";

// Carregamento lazy para os componentes das abas
const TelaDespesas = lazy(() => import('../components/TelaDespesas'));
const TelaDiscursos = lazy(() => import('../components/TelaDiscursos'));
const TelaEventos = lazy(() => import('../components/TelaEventos'));
// TelaHistorico removido pois não será mais uma aba

// --- COMPONENTES DE CARREGAMENTO ---
function PageLoadingSpinner() {
  return (
    <div className="page-loading-overlay">
      <div className="loading-spinner-animation"></div>
      <p className="loading-text">Aguarde enquanto carregamos as informações...</p>
    </div>
  );
}

function PgDeputado() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [deputado, setDeputado] = useState(null);
  const [activeTab, setActiveTab] = useState("despesas");
  
  // Estados da IA
  const [resumosIA, setResumosIA] = useState({
    despesas: null,
    discursos: null,
    eventos: null,
    historico: null
  });
  const [aiResponse, setAiResponse] = useState({ title: "", text: "", visible: false });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        // 1. Busca os dados CRÍTICOS (Deputado) - Se falhar, erro fatal na página
        const dataDeputado = await fetchDeputado(id);
        if (!dataDeputado || !dataDeputado.result || !dataDeputado.result.dados) {
            throw new Error("Dados do deputado não encontrados.");
        }
        setDeputado(dataDeputado.result.dados);
        
        // 2. Busca os dados OPCCIONAIS (IA) - Se falhar, a página continua a funcionar
        // Usamos Promise.allSettled para que uma falha não pare tudo
        const resultadosIA = await Promise.allSettled([
          fetchResumoDespesas(id),
          fetchResumoDiscursos(id),
          fetchResumoEventos(id),
          fetchResumoHistorico(id)
        ]);
        
        // Processa os resultados com segurança
        const [resDesp, resDisc, resEvt, resHist] = resultadosIA;

        // Função auxiliar para extrair texto de forma segura
        const extrairResumo = (resultado, nome) => {
            if (resultado.status === 'fulfilled' && resultado.value && resultado.value.resumo) {
                return resultado.value.resumo;
            }
            console.warn(`Falha ao carregar resumo de ${nome}:`, resultado.reason || "Dados inválidos");
            return "Não foi possível gerar este resumo no momento. Por favor, tente novamente mais tarde.";
        };

        setResumosIA({
          despesas: extrairResumo(resDesp, "despesas"),
          discursos: extrairResumo(resDisc, "discursos"),
          eventos: extrairResumo(resEvt, "eventos"),
          historico: extrairResumo(resHist, "histórico")
        });

      } catch (err) {
        setError(err);
        console.error("Erro crítico ao carregar página do deputado:", err);
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      fetchAllData();
    } else {
      setLoading(false);
      setError(new Error("Nenhum deputado selecionado."));
    }
  }, [id]);

  // Função para abrir o chat da IA
  const handleIaButtonClick = (type) => {
    let title = "";
    let text = "";
    
    if (type === 'discursos') {
      title = "Resumo dos Últimos Discursos";
      text = resumosIA.discursos;
    } else if (type === 'historico') {
      title = "Resumo do Histórico";
      text = resumosIA.historico;
    } else if (type === 'eventos') {
      title = "Resumo dos Próximos Eventos";
      text = resumosIA.eventos;
    }
    
    setAiResponse({ title, text, visible: true });
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "discursos":
        return <TelaDiscursos />;
      case "eventos":
        return <TelaEventos />;
      case "despesas":
      default:
        return <TelaDespesas />;
    }
  };

  if (loading) return <PageLoadingSpinner />; 
  
  if (error) {
    return (
      <div className="page-loading-overlay">
        <p className="loading-text" style={{ color: 'red' }}>
          Ocorreu um erro: {error.message}
        </p>
        <Link to="/home" style={{ marginTop: '20px', fontSize: '1rem' }}>
          Voltar para a busca
        </Link>
      </div>
    );
  }

  return (
    <>
      <NavBar />
      
      <div className="deputado-page-container">
        {/* Header recebe a função de clique da IA */}
        <HeaderDeputado deputado={deputado} onIaButtonClick={handleIaButtonClick} />

        <div className="tabs-container">
          <ul className="tabs-nav">
            {/* Aba de Histórico removida da navegação */}
            <li className={activeTab === 'despesas' ? 'active' : ''} onClick={() => setActiveTab('despesas')}>Despesas</li>
            <li className={activeTab === 'discursos' ? 'active' : ''} onClick={() => setActiveTab('discursos')}>Discursos</li>
            <li className={activeTab === 'eventos' ? 'active' : ''} onClick={() => setActiveTab('eventos')}>Eventos</li>
          </ul>
          
          <div className="tab-content">
            <Suspense fallback={null}>
              {renderTabContent()}
            </Suspense>
          </div>
        </div>
      </div>

      {/* Botão da IA */}
      <AIButton response={aiResponse} setResponse={setAiResponse} />

      <Footer />
    </>
  );
}

export default PgDeputado;