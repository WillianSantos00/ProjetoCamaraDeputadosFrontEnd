<<<<<<< HEAD
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
=======
import React from 'react';
import './AIButton.css';
import { BsFillChatFill, BsX } from 'react-icons/bs';

function AIButton({ response, setResponse }) {
  const { title, text, visible } = response;

  // Função para abrir o chat com uma mensagem padrão
  const handleToggle = () => {
    if (visible) {
      setResponse({ ...response, visible: false });
    } else {
      setResponse({ 
        title: 'Agente de IA', 
        text: 'Clique em uma das perguntas no topo da página para ver um resumo gerado por IA.', 
        visible: true 
      });
    }
  };

  // Função para fechar o chat
  const handleClose = () => {
    setResponse({ ...response, visible: false });
  };

  // Se a caixa de chat estiver visível, renderiza a versão expandida
  if (visible) {
    return (
      <div className="ai-chat-box">
        <div className="ai-chat-header">
          <div className="ai-chat-title">
            <BsFillChatFill />
            <span>{title}</span>
          </div>
          <button onClick={handleClose} className="ai-chat-close-btn">
            <BsX />
          </button>
        </div>
        <div className="ai-chat-body">
          <p>{text}</p>
        </div>
      </div>
    );
  }

  // Por defeito, renderiza apenas o botão flutuante
  return (
    <button className="ai-floating-btn" onClick={handleToggle}>
      <BsFillChatFill size={20} />
      <span>Agente de IA</span>
    </button>
  );
}

export default AIButton;
>>>>>>> origin/front1versao
