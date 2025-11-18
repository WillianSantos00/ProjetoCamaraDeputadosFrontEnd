import Cadastro from "./Cadastro";
import "./Footer.css"

<<<<<<< HEAD
function Footer(){

    return(

       <footer className="Footer-container">
            <div className="Footer-info">
                <h3>O PoliteAjuda é um projeto independente, sem qualquer filiação partidária ou vínculo com instituições políticas. Todas as informações apresentadas são baseadas em fontes públicas e oficiais, com o único objetivo de promover o acesso à informação e a participação cidadã de forma transparente e imparcial.</h3>
            </div>
            <div className="Footer-cadastro">
                <Cadastro />
            </div>
       </footer>

    )


}

export default Footer;
=======
function Footer() {
  return (
    <footer className="site-footer">
      {/* Seção 1: Cadastro da Newsletter */}
      <div className="footer-newsletter-section">
        <Cadastro />
      </div>

      {/* Seção 2: Conteúdo principal do rodapé */}
      <div className="footer-content">
        {/* Coluna 1: Sobre */}
        <div className="footer-column footer-about">
          <img src="/logopabranca.png" alt="PoliteAjuda Logo" className="footer-logo" />
          <p className="footer-about-text">
            O PoliteAjuda é um projeto independente, sem qualquer filiação partidária
            ou vínculo com instituições políticas. Todas as informações apresentadas
            são baseadas em fontes públicas e oficiais, com o único objetivo de
            promover o acesso à informação e a participação cidadã de forma
            transparente e imparcial.
          </p>
        </div>

        {/* Coluna 2: Links Úteis */}
        <div className="footer-column footer-links">
          <h3>Links Úteis</h3>
          <ul>
            <li><a href="/busca">Busca</a></li>
            <li><a href="/noticias">Notícias</a></li>
            <li><a href="/sobre-o-projeto">Sobre o Projeto</a></li>
          </ul>
        </div>

        {/* Coluna 3: Desenvolvimento */}
        <div className="footer-column footer-links">
          <h3>Desenvolvimento</h3>
          <ul>
            <li><a href="/documentacao">Documentação</a></li>
            <li><a href="/api">API</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
>>>>>>> origin/front1versao
