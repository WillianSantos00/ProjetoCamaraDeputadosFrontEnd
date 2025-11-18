import React from 'react';
import './Card.css';
import { Link } from 'react-router-dom';

function Card({ id, nome, siglaPartido, siglaUf, urlFoto }) {
  const linkTo = `/deputado?id=${id}`;

  // Lógica para truncar o nome do partido se for muito longo
  // Se o nome tiver mais de 9 caracteres, ele corta e adiciona "..."
  const nomePartidoExibicao = siglaPartido.length > 6
    ? `${siglaPartido.substring(0, 6)}...` 
    : siglaPartido;

  return (
    <Link to={linkTo} className="card-link">
      <div className="cardDeputado">
        <div className="card-topo">
          <div className="card-numero">Nº {id}</div>
          {/* Usamos a nova variável com o nome truncado aqui */}
          <div className="card-partido">Partido: {nomePartidoExibicao}</div>
        </div>

        <div className="card-content">
          <img src={urlFoto} alt={nome} className="fotoDeputado" />
          <h3 className="nomeDeputado">{nome}</h3>
          <p className="estadoDeputado">{siglaUf}</p>
        </div>

        <button className="btnVisualizar">Visualizar</button>
      </div>
    </Link>
  );
}

export default Card;

