import Cadastro from "./Cadastro";
import "./Footer.css"

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