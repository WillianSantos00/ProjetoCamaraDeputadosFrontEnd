import React from 'react';
import './CtaSection.css';

function CtaSection() {
  return (
    // O container principal que terá o fundo azul de largura total
    <div className="cta-section">
      {/* Este wrapper mantém o conteúdo alinhado com o resto da página */}
      <div className="cta-content-wrapper">
        <div className="cta-image-container">
          <img src="/ctaia.png" alt="Ilustração de setas e placas confusas" className="cta-image" />
        </div>
        <div className="cta-text-container">
          <h2>Ainda não achou o que precisava?</h2>
          <p>Utilize a PolitIA para te dar uma experiência mais personalizada!</p>
        </div>
      </div>
    </div>
  );
}

export default CtaSection;

