<<<<<<< HEAD
import "./App.css";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";



function App() {
  
  
  return <>
  <Outlet/>
  <Footer />
  </>

}

  


=======
import React from 'react';
import { Outlet } from 'react-router-dom'; // Importa o Outlet

// Importa os componentes de layout globais
import NavBar from './components/NavBar';
import Footer from './components/Footer';

// O App agora é um componente de layout simples
function App() {
  return (
    <>
      {/* A NavBar aparecerá em todas as páginas */}
      <NavBar />

      {/* O <main> é uma boa prática para o conteúdo principal */}
      <main>
        {/* O Outlet é onde o React Router irá renderizar a página da rota atual 
            (seja a PaginaInstitucional, Home, ou Deputado) */}
        <Outlet />
      </main>
      
      {/* O Footer também aparecerá em todas as páginas */}
      <Footer />
    </>
  );
}

>>>>>>> origin/front1versao
export default App;
