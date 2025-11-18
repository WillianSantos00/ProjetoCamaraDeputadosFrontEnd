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
  );
}

export default Home;