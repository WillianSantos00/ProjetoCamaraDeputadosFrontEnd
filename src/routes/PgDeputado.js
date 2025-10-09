import React, { useState, lazy } from "react";
import AIButton from "../components/AIButton";
import TelaInfos from "../components/TelaInfos";
import "./PgDeputado.css"
import TelaDespesas from "../components/TelaDespesas";
const ResumoIA = lazy(() => import('../components/ResumoIA'));



function Deputado(){

const tab1 = <TelaInfos />
const tab2 = <TelaDespesas />
const [activeTab, setActiveTab] = useState(tab1)


    return <>
        <div className="tabelaDeputado">
            <ul className="d-flex">
                <li className="flex-fill" onClick={e => setActiveTab(tab1)}>Infos Deputado</li>
                <li className="flex-fill" onClick={e => setActiveTab(tab2)}>Despesas</li>
                <li className="flex-fill">Discursos</li>
                <li className="flex-fill">Proposiçoes</li>
                <li className="flex-fill">Eventos</li>
                
            </ul>
            <div>
                 {activeTab}
            </div>
        </div>
       
        <AIButton />
        
        
    </>
    
}



export default Deputado;
