<<<<<<< HEAD
import React from "react";
import { useState, useEffect } from "react";
import { fetchDadosResumo } from "../api/data";
import Card from "../components/Card";
import "./Home.css";

function Home() {
  const [valorInput, setValorInput] = useState("");
  const [valorPartido, setValorPartido] = useState("");
  const [valorEstado, setValorEstado] = useState("");

    const [allDeputados, setAllDeputados] = useState([]);
  const [filteredDeputados, setFilteredDeputados] = useState([]);
  const [loading, setLoading] = useState(true);

    useEffect(() => {
    const getDados = async () => {
      try {
        setLoading(true);
        const data = await fetchDadosResumo();
        setAllDeputados(data.deputados || []);
        setFilteredDeputados(data.deputados || []);
      } catch (error) {
        console.error("Failed to fetch deputados:", error);
      } finally {
        setLoading(false);
      }
    };
    getDados();
  }, []); 

  useEffect(() => {
    const lowerInput = valorInput.toLowerCase();
    const lowerPartido = valorPartido.toLowerCase();
    const lowerEstado = valorEstado.toLowerCase();

    const filtered = allDeputados.filter(
      (dado) =>
        dado.nome.toLowerCase().includes(lowerInput) &&
        dado.siglaPartido.toLowerCase().includes(lowerPartido) &&
        dado.siglaUf.toLowerCase().includes(lowerEstado)
    );
    setFilteredDeputados(filtered);
  }, [valorInput, valorPartido, valorEstado, allDeputados]); 

  const handleChange = (event) => {
    setValorInput(event.target.value);
  };

  const handlePartidoChange = (event) => {
    setValorPartido(event.target.value);
  };

  const handleEstadoChange = (event) => {
    setValorEstado(event.target.value);
  };

  
  if (loading) {
    return <h2>Carregando...</h2>;
  }

  return (
    <>
      <h2>Lista de Deputados</h2>
      {}
      {}

      <div className="grid-pesquisa">
        <input
          type="text"
          className="nome-deputado"
          placeholder="Digite o nome do deputado"
          value={valorInput}
          onChange={handleChange}
        />
        
        <select name="partidos" id="select-partidos" onChange={handlePartidoChange}>
            {}
        </select>
        <select name="estados" id="select-estados" onChange={handleEstadoChange}>
            {}
        </select>
      </div>
      <div className="gridDeputados">
        {}
        {filteredDeputados.map((card) => (
          <Card
            key={card.id}
            id={card.id}
            nome={card.nome}
            siglaPartido={card.siglaPartido}
            siglaUf={card.siglaUf}
            urlFoto={card.urlFoto}
          />
        ))}
      </div>
    </>
=======
import React, { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

// 1. Importa o objeto de dados (como default export)
import dadosResumo from "../api/data"; 
import "./Home.css";
import Card from "../components/Card";
import CtaSection from "../components/CtaSection";

function Home() {
  const [searchParams] = useSearchParams();
  const queryParam = searchParams.get('q');

  // --- Estados dos Filtros ---
  const [valorInput, setValorInput] = useState(queryParam || "");
  const [valorPartido, setValorPartido] = useState("");
  const [valorEstado, setValorEstado] = useState("");
  
  // --- Estado da Paginação ---
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 20;

  // --- LÓGICA DE FILTRAGEM CORRIGIDA ---
  const deputadosFiltrados = useMemo(() => {
    // 2. CORREÇÃO: Aceder ao array .deputados dentro do objeto importado
    const dados = dadosResumo.deputados; 
    if (!dados || !Array.isArray(dados)) return [];
    
    return dados.filter(dado => {
      // Condição de segurança: ignora registos inválidos ou sem os campos essenciais.
      if (!dado || !dado.id || !dado.nome) {
        return false;
      }

      // 1. Filtro por NOME (case-insensitive)
      if (valorInput && !dado.nome.toLowerCase().includes(valorInput.toLowerCase())) {
        return false;
      }
      
      // 2. Filtro por PARTIDO (case-insensitive)
      if (valorPartido && (!dado.siglaPartido || !dado.siglaPartido.toLowerCase().includes(valorPartido.toLowerCase()))) {
        return false;
      }

      // 3. Filtro por ESTADO (case-insensitive)
      if (valorEstado && (!dado.siglaUf || !dado.siglaUf.toLowerCase().includes(valorEstado.toLowerCase()))) {
        return false;
      }
      return true;
    });
  }, [valorInput, valorPartido, valorEstado]); // 'dadosResumo' não é uma dependência

  const totalPages = Math.ceil(deputadosFiltrados.length / ITEMS_PER_PAGE);
  const currentItems = deputadosFiltrados.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  
  // --- Funções Handler ---
  const handleInputChange = (e) => { setValorInput(e.target.value); setCurrentPage(1); };
  const handlePartidoChange = (e) => { setValorPartido(e.target.value); setCurrentPage(1); };
  const handleEstadoChange = (e) => { setValorEstado(e.target.value); setCurrentPage(1); };


  const getPageNumbers = () => {
    const maxPagesToShow = 5;
    const pageNumbers = [];
    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
    } else {
      let startPage = Math.max(1, currentPage - 2);
      let endPage = Math.min(totalPages, currentPage + 2);
      if (currentPage <= 3) { startPage = 1; endPage = 5; }
      else if (currentPage >= totalPages - 2) { startPage = totalPages - 4; endPage = totalPages; }
      for (let i = startPage; i <= endPage; i++) pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const pageNumbersToDisplay = getPageNumbers();
  
  return (
    <div className="page-container">
      <div className="search-section">
        <div className="search-bar-wrapper">
          <input
            type="text"
            className="main-search-bar"
            placeholder="Digite aqui o nome de um candidato..."
            value={valorInput}
            onChange={handleInputChange} 
          />
          <button className="main-search-button">
            <img src="/binoculos 1.png" alt="Buscar" className="search-button-icon" />
            Buscar
          </button>
        </div>
      </div>
      
      <div className="filters-section">
        {/* Filtro de Estado Preenchido */}
        <select className="filter-dropdown" value={valorEstado} onChange={handleEstadoChange}>
          <option value="">Estado</option>
          <option value="AC">Acre</option>
          <option value="AL">Alagoas</option>
          <option value="AP">Amapá</option>
          <option value="AM">Amazonas</option>
          <option value="BA">Bahia</option>
          <option value="CE">Ceará</option>
          <option value="DF">Distrito Federal</option>
          <option value="ES">Espírito Santo</option>
          <option value="GO">Goiás</option>
          <option value="MA">Maranhão</option>
          <option value="MT">Mato Grosso</option>
          <option value="MS">Mato Grosso do Sul</option>
          <option value="MG">Minas Gerais</option>
          <option value="PA">Pará</option>
          <option value="PB">Paraíba</option>
          <option value="PR">Paraná</option>
          <option value="PE">Pernambuco</option>
          <option value="PI">Piauí</option>
          <option value="RJ">Rio de Janeiro</option>
          <option value="RN">Rio Grande do Norte</option>
          <option value="RS">Rio Grande do Sul</option>
          <option value="RO">Rondônia</option>
          <option value="RR">Roraima</option>
          <option value="SC">Santa Catarina</option>
          <option value="SP">São Paulo</option>
          <option value="SE">Sergipe</option>
          <option value="TO">Tocantins</option>
        </select>
        {/* Filtro de Partido Preenchido */}
        <select className="filter-dropdown" value={valorPartido} onChange={handlePartidoChange}>
          <option value="">Partido</option>
          <option value="MDB">MDB</option>
          <option value="PDT">PDT</option>
          <option value="PT">PT</option>
          <option value="PCdoB">PCdoB</option>
          <option value="PSB">PSB</option>
          <option value="PSDB">PSDB</option>
          <option value="AGIR">AGIR</option>
          <option value="MOBILIZA">MOBILIZA</option>
          <option value="CIDADANIA">CIDADANIA</option>
          <option value="PV">PV</option>
          <option value="AVANTE">AVANTE</option>
          <option value="PP">PP</option>
          <option value="PSTU">PSTU</option>
          <option value="PCB">PCB</option>
          <option value="PRTB">PRTB</option>
          <option value="DC">DC</option>
          <option value="PCO">PCO</option>
          <option value="PODE">PODE</option>
          <option value="REPUBLICANOS">REPUBLICANOS</option>
          <option value="PSOL">PSOL</option>
          <option value="PL">PL</option>
          <option value="PSD">PSD</option>
          <option value="SOLIDARIEDADE">SOLIDARIEDADE</option>
          <option value="NOVO">NOVO</option>
          <option value="REDE">REDE</option>
          <option value="PMB">PMB</option>
          <option value="UP">UP</option>
          <option value="UNIÃO">UNIÃO</option>
          <option value="PRD">PRD</option>
        </select>
      </div>

      <main className="results-section">
        <h3 className="results-count">
          {deputadosFiltrados.length} Candidatos encontrados
        </h3>

        <div className="gridDeputados">
          {currentItems.map((deputado) => (
            <Card
              key={deputado.id}
              id={deputado.id}
              nome={deputado.nome}
              siglaPartido={deputado.siglaPartido}
              siglaUf={deputado.siglaUf}
              urlFoto={deputado.urlFoto}
            />
          ))}
        </div>

        {totalPages > 1 && (
          <nav className="pagination">
            <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1}>&lt;</button>
            {pageNumbersToDisplay.map(num => (
              <button 
                key={num}
                onClick={() => setCurrentPage(num)}
                className={currentPage === num ? 'active' : ''}
              >
                {num}
              </button>
            ))}
            <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}>&gt;</button>
          </nav>
        )}
      </main>
      
      <CtaSection />
    </div>
>>>>>>> origin/front1versao
  );
}

export default Home;