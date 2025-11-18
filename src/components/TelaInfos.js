import React from 'react';
import './TelaInfos.css'; // Certifique-se de que este CSS existe e está estilizado

function TelaInfos({ deputado }) {
  // Adicionado para depuração: Verifique a consola do seu navegador (F12)
  console.log("Dados recebidos em TelaInfos:", deputado);

  if (!deputado) {
    return <p>Informações não disponíveis.</p>;
  }

  // Acesso seguro aos dados
  const { nomeCivil, dataNascimento, escolaridade, sexo, ultimoStatus } = deputado;

  return (
    <div className="infos-container">
      <div className="infos-foto">
        <img src={ultimoStatus?.urlFoto} alt={`Fotografia de ${nomeCivil}`} />
      </div>
      <div className="infos-detalhes">
        <h3>Detalhes do Parlamentar</h3>
        <ul>
          <li><strong>Nome Civil:</strong> {nomeCivil}</li>
          <li><strong>Partido:</strong> {ultimoStatus?.siglaPartido}</li>
          <li><strong>Estado:</strong> {ultimoStatus?.siglaUf}</li>
          <li><strong>Email:</strong> {ultimoStatus?.gabinete.email}</li>
          <li><strong>Telefone:</strong> {ultimoStatus?.gabinete.telefone}</li>
          <li><strong>Situação:</strong> {ultimoStatus?.situacao}</li>
          <li><strong>Sexo:</strong> {sexo === 'M' ? 'Masculino' : 'Feminino'}</li>
          <li><strong>Data de Nascimento:</strong> {dataNascimento}</li>
          <li><strong>Escolaridade:</strong> {escolaridade}</li>
        </ul>
      </div>
    </div>
  );
}

export default TelaInfos;