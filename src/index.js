import React from 'react';
import ReactDOM from 'react-dom/client';
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
);

