import React from 'react';
import './HeaderDeputado.css';
import {
  FaPhone, FaEnvelope, FaMapMarkerAlt, FaMale,
  FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaCalendarAlt
} from 'react-icons/fa';

// Função auxiliar para renderizar o ícone correto com base na URL
const renderSocialIcon = (url) => {
  if (url.includes('facebook')) {
    return <FaFacebookF />;
  }
  if (url.includes('instagram')) {
    return <FaInstagram />;
  }
  if (url.includes('twitter')) {
    return <FaTwitter />;
  }
  if (url.includes('youtube')) {
    return <FaYoutube />;
  }
  return null; // Retorna nulo se não encontrar uma rede social correspondente
};

function HeaderDeputado({ deputado, onIaButtonClick }) {
  if (!deputado) return null;

  const { ultimoStatus, nomeCivil, sexo, dataNascimento, redeSocial } = deputado;

  return (
    <div className="deputado-header-container">
      <div className="deputado-main-content">
        {/* Coluna da Esquerda: Fotografia */}
        <div className="deputado-foto">
          <div className="deputado-foto-inner">
            <img src={ultimoStatus.urlFoto} alt={`Fotografia de ${nomeCivil}`} />
          </div>
        </div>

        {/* Coluna Central: Informações */}
        <div className="deputado-info">
          <span className="status">{ultimoStatus.situacao}</span>
          <h1>{nomeCivil}</h1>
          <p className="partido">Partido: {ultimoStatus.siglaPartido}</p>
          <div className="deputado-contact-grid">
            <span><FaMale /> {sexo === 'M' ? 'Masculino' : 'Feminino'}</span>
            <a href={`mailto:${ultimoStatus.gabinete.email}`}><FaEnvelope /> {ultimoStatus.gabinete.email}</a>
            <span><FaMapMarkerAlt /> {ultimoStatus.siglaUf}</span>
            <span><FaPhone /> {ultimoStatus.gabinete.telefone}</span>
            <span><FaCalendarAlt /> {dataNascimento}</span>
          </div>
        </div>

        {/* Coluna da Direita: Redes Sociais (Renderização Dinâmica) */}
        <div className="social-links">
          {redeSocial && redeSocial.map((url) => {
            const icon = renderSocialIcon(url);
            // Só renderiza o link se um ícone correspondente for encontrado
            return icon ? (
              <a 
                key={url} 
                href={url} 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label={`Link para a rede social em ${url}`}
              >
                {icon}
              </a>
            ) : null;
          })}
        </div>
      </div>

      {/* Secção "Pergunte ao PolitIA" */}
      <div className="pergunte-ia">
        <span className="pergunte-ia-title">Pergunte ao PolitIA</span>
        <div className="pergunte-ia-buttons">
          <button onClick={() => onIaButtonClick('discursos')}>Quais foram os últimos discursos deste candidato?</button>
          <button onClick={() => onIaButtonClick('propostas')}>Quais foram as últimas propostas deste candidato?</button>
          <button onClick={() => onIaButtonClick('eventos')}>Quais os próximos eventos deste candidato?</button>
        </div>
      </div>
    </div>
  );
}

export default HeaderDeputado;

