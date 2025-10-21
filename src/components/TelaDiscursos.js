import { useEffect, useState } from "react";

import { useSearchParams } from "react-router-dom";
import { fetchDiscursos } from "../api/data";
import DatePicker from "react-datepicker";
import Discursos from "./Discursos";

// Supondo que você tenha uma função para buscar discursos na sua API
// import { fetchDiscursos } from '../api/data'; 

// Dados de exemplo, substitua pela sua chamada de API
const discursosExemplo = [
    { id: 1, data: "15/10/2025", resumo: "Discurso sobre a importância da educação básica..." },
    { id: 2, data: "12/10/2025", resumo: "Pronunciamento a respeito da reforma tributária..." },
    { id: 3, data: "10/10/2025", resumo: "Debate sobre políticas de segurança pública..." },
];

function TelaDiscursos() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [discursos, setDiscursos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Lógica para buscar os discursos da API (substitua o exemplo)
    const carregarDiscursos = async () => {
      try {
        // const dados = await fetchDiscursos(id);
        // setDiscursos(dados);
        setDiscursos(discursosExemplo); // Usando dados de exemplo
      } catch (error) {
        console.error("Erro ao buscar discursos:", error);
      } finally {
        setLoading(false);
      }
    };
    
    carregarDiscursos();
  }, [id]);

  if (loading) {
    return <p>Carregando discursos...</p>;
  }

  return (
    <div className="discursos-container">
      <h3>Últimos Discursos</h3>
      {discursos.length > 0 ? (
        discursos.map((discurso, index) => (
          // CORREÇÃO AQUI: Adicionada a propriedade "key"
          // Usamos o id do discurso se ele existir, senão o index do array.
          <div key={discurso.id || index} className="discurso-item">
            <strong>Data:</strong> {discurso.data}
            <p>{discurso.resumo}</p>
          </div>
        ))
      ) : (
        <p>Nenhum discurso encontrado para este parlamentar.</p>
      )}
    </div>
  );
}

export default TelaDiscursos;
