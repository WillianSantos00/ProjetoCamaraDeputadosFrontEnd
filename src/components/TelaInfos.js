import React from 'react';
import './TelaInfos.css'; // Importa o CSS atualizado

function TelaInfos({ deputado }) {
  // Se os dados do deputado ainda não chegaram, mostra uma mensagem.
  if (!deputado) {
    return <p>A carregar informações...</p>;
  }

  // Extrai os dados para facilitar a leitura no JSX
  const {
    urlFoto,
    nomeCivil,
    siglaPartido,
    siglaUf,
    email,
    situacao,
    cpf,
    sexo,
    redeSocial,
    escolaridade,
    dataNascimento,
    telefone
  } = {
    urlFoto: deputado.ultimoStatus.urlFoto,
    nomeCivil: deputado.nomeCivil,
    siglaPartido: deputado.ultimoStatus.siglaPartido,
    siglaUf: deputado.ultimoStatus.siglaUf,
    email: deputado.ultimoStatus.gabinete.email,
    situacao: deputado.ultimoStatus.situacao,
    cpf: deputado.cpf,
    sexo: deputado.sexo,
    redeSocial: deputado.redeSocial,
    escolaridade: deputado.escolaridade,
    dataNascimento: deputado.dataNascimento,
    telefone: deputado.ultimoStatus.gabinete.telefone
  };

  return (
    <div className="infos-container">
      <div className="infos-perfil">
        <img src={urlFoto} alt={`Foto de ${nomeCivil}`} className="infos-foto" />
      </div>
      <div className="infos-detalhes">
        <h3>Detalhes do Parlamentar</h3>
        <ul>
          <li><strong>Nome Civil:</strong> {nomeCivil}</li>
          <li><strong>Partido:</strong> {siglaPartido}</li>
          <li><strong>Estado:</strong> {siglaUf}</li>
          <li><strong>Situação:</strong> {situacao}</li>
          <li><strong>Data de Nascimento:</strong> {dataNascimento}</li>
          <li><strong>Sexo:</strong> {sexo === 'M' ? 'Masculino' : 'Feminino'}</li>
          <li><strong>Escolaridade:</strong> {escolaridade}</li>
          <li><strong>E-mail:</strong> {email}</li>
          <li><strong>Telefone:</strong> {telefone}</li>
          <li><strong>CPF:</strong> {cpf}</li>
          <li><strong>Redes Sociais:</strong> {redeSocial && redeSocial.length > 0 ? redeSocial[0] : 'N/A'}</li>
        </ul>
      </div>
    </div>
  );
}

export default TelaInfos;

