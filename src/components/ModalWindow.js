import { useState, useEffect } from "react";
import "./ModalWindow.css"
import ResumoIA from "./ResumoIA";


function ModalWindow(props){
   
    function consolaDespesas(){
    console.log(props.resumoDespesas)
}

     function consolaDiscursos(){
    console.log(props.resumoDiscursos)
}

function consolaEventos(){
    console.log(props.resumoEventos)
}


const [textoIA, setTextoIA] = useState("")

const handleChange = (event) =>{
    setTextoIA(event.target.value);
  }
    
    return(

        <div className="ModalWindow" style={{opacity: props.visible ? "1": "0"}}>
        <div className="Cabecalho"></div>
        <h4>Selecione os assuntos que gostaria de um resumo:</h4>
        <button className="BotaoResumo" onClick={handleChange} value={props.resumoDiscursos}>Discursos Recentes</button>
        <button className="BotaoResumo" onClick={handleChange} value={props.resumoDespesas}>Despesas Gerais</button>
        <button className="BotaoResumo" onClick={handleChange} value={props.resumoEventos}>Eventos Recentes</button>
        <button className="BotaoResumo" onClick={handleChange} value={props.resumoHistorico}>Histórico Politico e Profissional</button>
        <div>
            <h5 className="TextoIA"><i><ResumoIA resumoIA={textoIA}/></i></h5>
        </div>
        

        </div>


    )

}

export default ModalWindow;