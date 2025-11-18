import React, { useState, useEffect, Suspense, lazy } from "react";
import { useSearchParams } from "react-router-dom";
import "./PgDeputado.css";

// --- API ---
import { fetchDeputado, fetchResumoDespesas, fetchResumoDiscursos, fetchResumoEventos } from "../api/data";

// --- Componentes ---
import NavBar from "../components/NavBar";
import HeaderDeputado from "../components/HeaderDeputado";
import AIButton from "../components/AIButton";
import Footer from "../components/Footer";

// Carregamento lazy para os componentes das abas
const TelaDespesas = lazy(() => import('../components/TelaDespesas'));
const TelaDiscursos = lazy(() => import('../components/TelaDiscursos'));
const TelaEventos = lazy(() => import('../components/TelaEventos'));

// --- COMPONENTES DE CARREGAMENTO ---

// 1. Este é o spinner para o CARREGAMENTO DA PÁGINA INTEIRA
function PageLoadingSpinner() {
  return (
    <div className="page-loading-overlay">
      <div className="loading-spinner-animation"></div>
      <p className="loading-text">Aguarde enquanto carregamos as informações...</p>
    </div>
  );
}

// 2. Este é o spinner para o CARREGAMENTO INTERNO DAS ABAS
// (Não será usado se o fallback for null, mas mantemos para referência futura)
function TabLoadingSpinner() {
  return (
    <div className="tab-loading-overlay">
      <div className="loading-spinner-animation"></div>
      <p className="loading-text">Aguarde enquanto carregamos as informações...</p>
    </div>
  );
}
// --- FIM DOS COMPONENTES DE CARREGAMENTO ---


function PgDeputado() {
  // --- Estados ---
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [deputado, setDeputado] = useState(null);
  const [activeTab, setActiveTab] = useState("despesas");
  const [resumosIA, setResumosIA] = useState({});
  const [aiResponse, setAiResponse] = useState({ title: "", text: "", visible: false });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- Efeito para buscar todos os dados ---
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [dataDeputado, resumoDesp, resumoDisc, resumoEvt] = await Promise.all([
          fetchDeputado(id),
          fetchResumoDespesas(id),
          fetchResumoDiscursos(id),
          fetchResumoEventos(id)
        ]);
        
        setDeputado(dataDeputado.result.dados);
        setResumosIA({
          despesas: resumoDesp.resumo,
          discursos: resumoDisc.resumo,
          eventos: resumoEvt.resumo
        });

      } catch (err) { // <-- CORREÇÃO: Bloco catch formatado corretamente
        setError(err);
        console.error("Erro ao carregar dados da página:", err);
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchAllData();
    }
  }, [id]);

  // --- Funções ---
  const handleIaButtonClick = (type) => {
    let title = "";
    let text = "";
    if (type === 'discursos') {
      title = "Resumo dos Últimos Discursos";
      text = resumosIA.discursos;
    } else if (type === 'propostas') {
      title = "Resumo das Últimas Propostas";
      text = "Funcionalidade de propostas ainda em desenvolvimento.";
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

  // 3. USA O SPINNER DE PÁGINA INTEIRA AQUI
  if (loading) return <PageLoadingSpinner />; 
  if (error) return <p>Ocorreu um erro ao carregar os dados: {error.message}</p>;

  return (
    <>
      <NavBar />
      
      <div className="deputado-page-container">
        <HeaderDeputado deputado={deputado} onIaButtonClick={handleIaButtonClick} />

        <div className="tabs-container">
          <ul className="tabs-nav">
            <li className={activeTab === 'despesas' ? 'active' : ''} onClick={() => setActiveTab('despesas')}>Despesas</li>
            <li className={activeTab === 'discursos' ? 'active' : ''} onClick={() => setActiveTab('discursos')}>Discursos</li>
            <li className={activeTab === 'eventos' ? 'active' : ''} onClick={() => setActiveTab('eventos')}>Eventos</li>
          </ul>
          
          <div className="tab-content">
            {/* O fallback foi mudado para 'null' para não mostrar loading nas abas */}
            <Suspense fallback={null}>
              {renderTabContent()}
            </Suspense>
          </div>
        </div>
      </div>

      <AIButton response={aiResponse} setResponse={setAiResponse} />

      <Footer />
    </>
  );
}

export default PgDeputado;
