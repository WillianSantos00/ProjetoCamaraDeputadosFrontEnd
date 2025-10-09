import { useEffect, useRef, useState } from "react";
import "./AIButton.css"
import { BsFillChatFill} from "react-icons/bs";
import ModalWindow from "./ModalWindow";
import { fetchResumoDespesas, fetchResumoDiscursos, fetchResumoEventos, fetchResumoHistorico } from "../api/data";
import { useSearchParams } from "react-router-dom";

function AIButton() {

  const [searchParams] = useSearchParams();

    const id = searchParams.get("id")
    const [hovered, setHovered] = useState(false);
    const [visible, setVisible] = useState(false);
    const [resumoDespesas, setResumoDespesas] = useState(null);
    const [resumoDiscursos, setResumoDiscursos] = useState(null);
    const [resumoEventos, setResumoEventos] = useState(null);
    const [resumoHistorico, setResumoHistorico] = useState(null);
    

    const widgetRef = useRef(null);

    useEffect(() => {
      function handleClickOutside(event){
      if(widgetRef.current && !widgetRef.current.contains(event.target)){
        setVisible(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    }, [widgetRef])

    useEffect(() => {
    
        const fetchResumos = async() =>{
            try{
            const resumoDespesas = await fetchResumoDespesas(id);
            const resumoDiscursos = await fetchResumoDiscursos(id);
            const resumoEventos = await fetchResumoEventos(id);
            const resumoHistorico = await fetchResumoHistorico(id);
            setResumoDespesas(resumoDespesas.resumo)
            setResumoDiscursos(resumoDiscursos.resumo)
            setResumoEventos(resumoEventos.resumo)
            setResumoHistorico(resumoHistorico.resumo)
            }catch(err){
                return(err)
            }
    
        }
    
        fetchResumos();
    
    }, [])

 return (
   <div ref={widgetRef}>
     <ModalWindow visible={visible} resumoDespesas={resumoDespesas} 
     resumoDiscursos={resumoDiscursos} resumoEventos={resumoEventos}
     resumoHistorico={resumoHistorico}/>
     <div className="chatWidget" onClick={() => setVisible(!visible)}
        onMouseEnter={()=> setHovered(true)}
        onMouseLeave={()=> setHovered(false)}
        style={{border: hovered ? "2px solid black" : ""}}>
       {/* Inner Container */}  
       <div className="InnerContainer">
         {/* Button Text */}
         <BsFillChatFill size={20} color="white" />
         <span className="chatWidgetText">Agente de IA</span>
       </div>
     </div>
   </div>
 );
}


export default AIButton;