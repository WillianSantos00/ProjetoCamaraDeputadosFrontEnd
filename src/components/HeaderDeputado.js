import React from 'react';
import './HeaderDeputado.css';
import {
  FaMale, FaMapMarkerAlt, FaCalendarAlt, FaEnvelope, FaPhone,
  FaFacebookF, FaInstagram, FaTwitter, FaYoutube
} from 'react-icons/fa';

function HeaderDeputado({ deputado, onIaButtonClick }) {
  if (!deputado) return null;

  const { ultimoStatus, nomeCivil, sexo, dataNascimento, redeSocial } = deputado;

  const renderSocialIcon = (url) => {
    if (url.includes('facebook')) return <FaFacebookF />;
    if (url.includes('instagram')) return <FaInstagram />;
    if (url.includes('twitter')) return <FaTwitter />;
    if (url.includes('youtube')) return <FaYoutube />;
    return null;
  };

  return (
    <div className="deputado-header-container">
      <div className="deputado-main-content">
        <div className="deputado-foto">
          <div className="deputado-foto-inner">
             <img src={ultimoStatus.urlFoto} alt={`Foto de ${nomeCivil}`} />
          </div>
        </div>

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

        <div className="social-links">
           {redeSocial && redeSocial.map((url) => {
            const icon = renderSocialIcon(url);
            return icon ? (
              <a key={url} href={url} target="_blank" rel="noopener noreferrer">
                {icon}
              </a>
            ) : null;
          })}
        </div>
      </div>

      {/* Secção da IA Restaurada e Atualizada */}
      <div className="pergunte-ia">
        <span className="pergunte-ia-title">Pergunte ao PolitIA</span>
        <div className="pergunte-ia-buttons">
          <button onClick={() => onIaButtonClick('discursos')}>Quais foram os últimos discursos?</button>
          {/* Botão Atualizado para Histórico */}
          <button onClick={() => onIaButtonClick('historico')}>Qual o histórico desse candidato?</button>
          <button onClick={() => onIaButtonClick('eventos')}>Quais os próximos eventos?</button>
        </div>
      </div>
    </div>
  );
}

export default HeaderDeputado;