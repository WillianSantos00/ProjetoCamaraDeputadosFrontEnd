import React, { useState } from "react";
import { fetchCadastro } from "../api/data"; // Supondo que esta função exista
import "./Cadastro.css";

function Cadastro() {
  const [email, setEmail] = useState("");
  const [celular, setCelular] = useState("");
  const [aviso, setAviso] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault(); // Previne o recarregamento da página
    setLoading(true);
    setAviso(""); // Limpa o aviso anterior

    try {
      if (!email || !celular) {
        setAviso("Todos os campos devem estar preenchidos");
        setLoading(false);
        return;
      }

      if (!email.includes("@") || !email.includes(".")) {
        setAviso("Por favor, insira um e-mail válido");
        setLoading(false);
        return;
      }
      
      // Simulação da chamada da API
      const responseStatus = await fetchCadastro(email, celular);
      
      if (responseStatus === 201) {
        setAviso("Cadastrado com Sucesso!");
        setEmail("");
        setCelular("");
      } else {
        setAviso("Algo deu errado. Tente novamente.");
      }

    } catch (err) {
      console.error("Erro no cadastro:", err);
      setAviso("Erro ao conectar com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="newsletter-container">
      <h4 className="newsletter-title">
        Cadastre seu e-mail e telefone para receber atualizações!
      </h4>
      <form className="newsletter-form" onSubmit={handleSubmit}>
        <input
          className="newsletter-input"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />
        <input
          className="newsletter-input"
          placeholder="Celular"
          type="tel"
          value={celular}
          onChange={(e) => setCelular(e.target.value)}
          disabled={loading}
        />
        <button
          className="newsletter-button"
          type="submit"
          disabled={loading}
        >
          {loading ? "Enviando..." : "Cadastrar"}
        </button>
      </form>
      {aviso && <label className="newsletter-aviso">{aviso}</label>}
    </div>
  );
}

export default Cadastro;
