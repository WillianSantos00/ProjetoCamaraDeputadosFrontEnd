import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom"; // Importa o Link para navegação
import "./NavBar.css"; 

function NavBar() {
    const navRef = useRef();

    const showNavbar = () => {
        navRef.current.classList.toggle("responsive_nav");
    };

    return (
        <header>
            {/* O logótipo agora é um link para a página inicial */}
            <Link to="/">
                <img src="/logopa.png" alt="PoliteAjuda Logo" className="logo" />
            </Link>

            <nav ref={navRef}>
                {/* Novo link "Início" adicionado */}
                <Link to="/PaginaInstitucional">Início</Link>
                <Link to="/home">Busca</Link>
                {/* Alterado para levar à página institucional */}
                <Link to="/">Sobre o projeto</Link>
        
                <button
                    className="nav-btn nav-close-btn"
                    onClick={showNavbar}>
                    <FaTimes />
                </button>
            </nav>
            <button
                className="nav-btn"
                onClick={showNavbar}>
                <FaBars />
            </button>
        </header>
    );
}

export default NavBar;

