import React from 'react';
import './SobreNos.css';

function SobreNos() {
  return (
    <section className="sobre-nos-section">
      <div className="sobre-nos-image-container">
        {/* A imagem 'sobrenos.png' deve estar na sua pasta 'public' */}
        <img src="/sobrenos.png" alt="Ilustração de uma lâmpada com engrenagens" />
      </div>
      <div className="sobre-nos-text-container">
        <h2>Sobre Nós</h2>
        <p>
          O PoliteAjuda nasceu da vontade de facilitar o acesso da população brasileira a dados políticos confiáveis.
          Acreditamos no poder da informação para cidadãos que querem participar mais ativamente da vida
          política, mas enfrentam duas barreiras: a linguagem complexa e a dificuldade de
          encontrar tudo em um só lugar.
        </p>
        <a href="#" className="saiba-mais-btn">Saiba mais &rarr;</a>
      </div>
    </section>
  );
}

export default SobreNos;
