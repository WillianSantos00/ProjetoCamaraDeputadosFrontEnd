import React, { useState, lazy } from "react";
import AIButton from "../components/AIButton";
import TelaInfos from "../components/TelaInfos";
import "./PgDeputado.css"
import TelaDespesas from "../components/TelaDespesas";
import TelaDiscursos from "../components/TelaDiscursos";
import TelaEventos from "../components/TelaEventos";
const ResumoIA = lazy(() => import('../components/ResumoIA'));



function Deputado(){

const tab1 = <TelaInfos />
const tab2 = <TelaDespesas />
const tab3 = <TelaDiscursos />
const tab5 = <TelaEventos />
const [activeTab, setActiveTab] = useState(tab1)


    return <>
        <div className="tabelaDeputado">
            <ul className="d-flex">
                <li className="flex-fill" onClick={e => setActiveTab(tab1)}>Infos Deputado</li>
                <li className="flex-fill" onClick={e => setActiveTab(tab2)}>Despesas</li>
                <li className="flex-fill" onClick={e => setActiveTab(tab3)}>Discursos</li>
                <li className="flex-fill">Proposiçoes</li>
                <li className="flex-fill" onClick={e => setActiveTab(tab5)}>Eventos</li>
                
            </ul>
            <div>
                 {activeTab}
            </div>
        </div>
       
        <AIButton />
        
        
    </>
    
}



export default Deputado;
