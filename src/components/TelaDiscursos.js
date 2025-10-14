import { useEffect, useState } from "react";

import { useSearchParams } from "react-router-dom";
import { fetchDiscursos } from "../api/data";
import DatePicker from "react-datepicker";
import Discursos from "./Discursos";

function TelaDiscursos(){
const [searchParams] = useSearchParams();
const id = searchParams.get("id");
const [discurso, setDiscurso] = useState(null);
const [pagina, setPagina] = useState(1);
const [ultimaPagina, setUltimaPagina] = useState(true);
const [dateRange, setDateRange] = useState("");
const [startDate, setStartDate] = useState(new Date());
const [endDate, setEndDate] = useState(null);
const [startDateFormatada, setStartDateFormatada] = useState("");
const [endDateFormatada, setEndDateFormatada] = useState("");
const [error, setError] = useState(null);
const [loading, setLoading] = useState(true);


    useEffect(() => {
    
        const fetchDados = async() =>{
            try{
            const resultDiscurso = await fetchDiscursos(id, startDateFormatada, endDateFormatada);
            if(resultDiscurso != null || resultDiscurso != []){
            setDiscurso(resultDiscurso.result);
            //setUltimaPagina(resultDiscurso.result[1])
            }
            }catch(err){
                setError(err);
            }finally{
                setLoading(false)
            }
    
        }
    
        fetchDados();
    
    }, [pagina, endDateFormatada, startDateFormatada]);

    useEffect(()=>{
    if(startDate && endDate){
    setDateRange(`Selected date range: ${startDate.toDateString()} - ${endDate.toDateString()}`)
  }else if(`Select start date: ${startDate.toDateString()}`){

  }else{
    setDateRange("");
  }

},[startDate, endDate])

 useEffect(()=>{

    const startDateString = startDate.toLocaleDateString('pt-br');
    const data = startDateString.replace(/\//g, '-');
    let dataInvertida = data.split('-').reverse().join('-');
    setStartDateFormatada(dataInvertida);
    


  },[startDate])

  useEffect(()=>{
    if(endDate != null){
    const endDateString = endDate.toLocaleDateString('pt-br');
    const data = endDateString.replace(/\//g, '-');
    let dataInvertida = data.split('-').reverse().join('-');
    setEndDateFormatada(dataInvertida);
    
    }else{
        setEndDateFormatada("")
    }
    

  },[endDate]);

  const onChangeDate = (dates) =>{
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  }
    
    if (loading){
        return <p>Por favor Aguarde</p> 
    }
    if (error) return <p>{error.message}</p>
    

    
    return(
        
    <div className="TelaDiscursos-container">
        <center><DatePicker
        selected={startDate}
            onChange={onChangeDate}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            inline
            />
            </center>
        <br />
        
         {discurso.map((item) => <Discursos dataHoraInicio={item.dataHoraInicio}
         dataHoraFim={item.dataHoraFim} titulo={item.faseEvento.titulo} 
         tipoDiscurso={item.tipoDiscurso} sumario={item.sumario} 
         transcricao={item.transcricao}/>)}
       
    </div>
    )
   
}

export default TelaDiscursos