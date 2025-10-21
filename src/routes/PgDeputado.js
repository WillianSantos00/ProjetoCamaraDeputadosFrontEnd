import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import "./PgDeputado.css";

// --- API ---
import { fetchDeputado, fetchResumoDespesas, fetchResumoDiscursos, fetchResumoEventos } from "../api/data";

// --- Componentes ---
import NavBar from "../components/NavBar"; // Importa a NavBar
import HeaderDeputado from "../components/HeaderDeputado";
import TelaDespesas from "../components/TelaDespesas";
import ModalIA from "../components/ModalIA";
import Footer from "../components/Footer"; // Importa o Footer

function LoadingSpinner() {
  return <div className="loading-spinner">A carregar...</div>;
}

function PgDeputado() {
  // --- Estados ---
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [deputado, setDeputado] = useState(null);
  const [resumosIA, setResumosIA] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", text: "" });
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

      } catch (err) {
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
    setModalContent({ title, text });
    setModalVisible(true);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <p>Ocorreu um erro ao carregar os dados: {error.message}</p>;

  return (
    // Usa um Fragmento para agrupar os componentes
    <>
      <NavBar />
      
      <div className="deputado-page-container">
        {/* Bloco 1: Informações do Deputado */}
        <HeaderDeputado deputado={deputado} onIaButtonClick={handleIaButtonClick} />

        {/* Bloco 2: Conteúdo de Despesas */}
        <div className="deputado-content-wrapper">
          <TelaDespesas />
        </div>

        {/* Modal da IA (não visível até ser ativado) */}
        <ModalIA 
          visible={modalVisible} 
          title={modalContent.title}
          text={modalContent.text}
          onClose={() => setModalVisible(false)} 
        />
      </div>

      <Footer />
    </>
  );
}

export default PgDeputado;

