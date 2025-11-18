import React, { useState } from 'react';
import './Faq.css';

const faqData = [
  {
    question: 'De onde vêm as informações?',
    answer: 'Todos os dados são extraídos de fontes oficiais como o TSE, portais de transparência e bases públicas. Nosso papel é organizar e traduzir essas informações para facilitar o entendimento.'
  },
  {
    question: 'Como funciona o acompanhamento dos planos de governo?',
    answer: 'Nossa plataforma monitora as propostas feitas durante a campanha e cruza com dados de votações e projetos de lei para avaliar o progresso.'
  },
  {
    question: 'Preciso pagar para usar a plataforma?',
    answer: 'Não. O PoliteAjuda é e sempre será uma ferramenta gratuita para todos os cidadãos, financiada por doações e parcerias institucionais.'
  },
  {
    question: 'Encontrei um erro ou tenho uma sugestão. O que faço?',
    answer: 'Ficamos felizes com a sua colaboração! Por favor, utilize a nossa página de contato para nos enviar a sua mensagem. Analisamos todas as sugestões.'
  },
  {
    question: 'A plataforma possui filiação política?',
    answer: 'Não. Somos um projeto independente e apartidário. Nosso único compromisso é com a transparência e o acesso à informação de qualidade.'
  }
];

function FaqItem({ item, index, activeIndex, setActiveIndex }) {
  const isOpen = index === activeIndex;

  const handleToggle = () => {
    setActiveIndex(isOpen ? null : index);
  };

  return (
    <div className="faq-item">
      <div className="faq-question" onClick={handleToggle}>
        {item.question}
        <span className={`faq-arrow ${isOpen ? 'open' : ''}`}>&#9660;</span>
      </div>
      {isOpen && (
        <div className="faq-answer">
          <p>{item.answer}</p>
        </div>
      )}
    </div>
  );
}

// O nome da função deve ser "Faq" (com letra maiúscula)
function Faq() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="faq-section">
      <h2>Perguntas Frequentes</h2>
      <div className="faq-list">
        {faqData.map((item, index) => (
          <FaqItem 
            key={index}
            item={item}
            index={index}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />
        ))}
      </div>
    </section>
  );
}

// A exportação também deve ser "Faq"
export default Faq;

