import React from 'react';
import ReactDOM from 'react-dom/client';
<<<<<<< HEAD
import App from './App';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Deputado from './routes/PgDeputado';
import Home from './routes/Home';

const router = createBrowserRouter([

    {
        path: "/",
        element: <App />,
        children: [
            {
        path: "/",
        element: <Home />
            },
            {
        path: "/deputado",
        element: <Deputado />
            }
                ]
    }

])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RouterProvider router={router} />
=======
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Componentes e Páginas
import App from './App'; // App (com Nav/Footer)
import Home from './routes/Home';
import PgDeputado from './routes/PgDeputado'; // Página do Deputado (sem layout)
import PaginaInstitucional from './routes/PaginaInstitucional';

const router = createBrowserRouter([
    {
        // Rota 1: Layout Principal (com NavBar e Footer)
        path: "/",
        element: <App />, // App.js atua como layout
        children: [
            {
                index: true, // Define PaginaInstitucional como a rota para "/"
                element: <PaginaInstitucional />
            },
            {
                path: "home", // A página de busca de deputados
                element: <Home />
            }
            // A rota "deputado" foi movida para fora deste layout
        ]
    },
    {
        // Rota 2: Página do Deputado (sem layout)
        // Corresponde a /deputado E a /deputado?id=...
        path: "deputado", 
        element: <PgDeputado />
    }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
>>>>>>> origin/front1versao
);

