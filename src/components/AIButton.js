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
