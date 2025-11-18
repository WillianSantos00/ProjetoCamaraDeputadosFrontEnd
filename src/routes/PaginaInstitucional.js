import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PaginaInstitucional.css';

// Componentes da página
import SobreNos from '../components/SobreNos';
import Faq from '../components/Faq'; // Importa o componente de FAQ

function PaginaInstitucional() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    // Redireciona para a página /home com o termo de pesquisa como parâmetro 'q'
    if (searchTerm.trim()) {
      navigate(`/home?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <div className="institucional-page">
    
      {/* Secção 1: Banner com Pesquisa */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>PoliteAjuda: A política descomplicada para <strong>todos</strong>.</h1>
          <p>Busque. Compare. Decida com consciência.</p>
          <div className="hero-search-bar-wrapper">
            <input
              type="text"
              className="hero-search-bar"
              // O placeholder foi atualizado
              placeholder="Digite aqui o nome de um candidato..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button className="hero-search-button" onClick={handleSearch}>
              <img src="/binoculos 1.png" alt="Buscar" className="hero-search-icon" />
              Buscar
            </button>
          </div>
        </div>
      </section>

      {/* Secção 2: Blocos de informação */}
      <main className="page-content">
        <section className="info-cards-section">
          <h2>Aqui você pode pesquisar informações políticas de forma rápida e simples.</h2>
          <p>Pesquise o tema de interesse e explore dados organizados de forma clara e acessível.</p>
          <div className="info-cards-grid">
            <div className="info-card">Que detalhes sobre um candidato?</div>
            <div className="info-card">Buscar propostas por tema</div>
            <div className="info-card">Indeciso em quem votar?</div>
            <div className="info-card">Dados confiáveis e atualizados</div>
          </div>
        </section>

        {/* Secção 3: Sobre Nós */}
        <SobreNos />

        {/* Secção 4: Perguntas Frequentes */}
        <Faq />
     
      </main>

    </div>
  );
}

export default PaginaInstitucional;