import "./Discursos.css"

function Discursos({dataHoraInicio, dataHoraFim, titulo, tipoDiscurso, sumario,
    transcricao
}){

       
    return <>
    
    <div className="Discursos-container">
        <div className="info-discursos">
            <h4>Data e Hora de Inicio: {dataHoraInicio}</h4>
            <h4>Data e Hora de Fim: {dataHoraFim}</h4>
            <h4>Título:{titulo}</h4>
            <h4>Tipo Discurso: {tipoDiscurso}</h4>
            <h4>Sumario: {sumario}</h4>
            <h4><b>Transcrição:</b> {transcricao}</h4>
        </div>
        
    </div>
        
    
    </>
}

export default Discursos;