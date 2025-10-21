import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Componentes e Páginas
import App from './App';
import Home from './routes/Home';
import Deputado from './routes/PgDeputado';
import PaginaInstitucional from './routes/PaginaInstitucional';

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />, // App atua como o layout principal (com NavBar, Footer)
        children: [
            {
                index: true, // Define PaginaInstitucional como a rota para "/"
                element: <PaginaInstitucional />
            },
            {
                path: "home", // A página de busca de deputados
                element: <Home />
            },
            {
                path: "deputado", // A página de detalhes do deputado
                element: <Deputado />
            }
        ]
    }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RouterProvider router={router} />
);

