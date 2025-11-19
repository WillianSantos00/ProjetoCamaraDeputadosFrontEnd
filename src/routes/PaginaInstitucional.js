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
            {/* Card 1: Perfil */}
            <div className="info-card">
              <div className="card-icon">
                <img src="/bloco1.svg" alt="Ícone Perfil" onError={(e) => e.target.style.display='none'} />
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="fallback-icon"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              </div>
              <h3>Quer saber mais sobre um candidato?</h3>
              <p>Descubra sua trajetória, propostas, compromissos de campanha e plano de governo.</p>
            </div>

            {/* Card 2: Propostas */}
            <div className="info-card">
              <div className="card-icon">
                <img src="/bloco2.svg" alt="Ícone Lista" onError={(e) => e.target.style.display='none'} />
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="fallback-icon"><path d="M9 6h11"></path><path d="M9 12h11"></path><path d="M9 18h11"></path><path d="M3 6h.01"></path><path d="M3 12h.01"></path><path d="M3 18h.01"></path></svg>
              </div>
              <h3>Buscando propostas por tema?</h3>
              <p>Filtre por áreas como saúde, educação, segurança, meio ambiente, e muito mais.</p>
            </div>

            {/* Card 3: Votação */}
            <div className="info-card">
              <div className="card-icon">
                <img src="/bloco3.svg" alt="Ícone Votação" onError={(e) => e.target.style.display='none'} />
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="fallback-icon"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              </div>
              <h3>Indeciso em quem votar?</h3>
              <p>Nossa IA te ajudará a comparar as propostas dos candidatos de sua região e ver qual se alinha melhor aos seus valores.</p>
            </div>

            {/* Card 4: Segurança */}
            <div className="info-card">
              <div className="card-icon">
                <img src="/bloco4.svg" alt="Ícone Segurança" onError={(e) => e.target.style.display='none'} />
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="fallback-icon"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
              </div>
              <h3>Dados confiáveis e atualizados</h3>
              <p>As informações vêm de fontes oficiais e são organizadas para facilitar sua decisão.</p>
            </div>
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