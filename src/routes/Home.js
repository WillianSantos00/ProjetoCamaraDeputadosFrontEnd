import React from "react";
import { useState } from "react";
import deputados from "../db/data";
import Card from "../components/Card";
import "./Home.css";

var filtroNome = []
function BuscarDeputados(valorInput, valorPartido, valorEstado){

  const dados = deputados;
  let nome, partido, estado
  nome = valorInput;
  partido = valorPartido;
  estado = valorEstado;

   filtroNome = dados.filter(dado => (

    ((dado.nome).toLowerCase()).includes(nome.toLowerCase())

  ))

  
    filtroNome = filtroNome.filter(dado => (

    ((dado.siglaPartido).toLowerCase()).includes(partido.toLowerCase())

  ))

  filtroNome = filtroNome.filter(dado => (

    ((dado.siglaUf).toLowerCase()).includes(estado.toLowerCase())

  ))
}

function Home(){
const [valorInput, setValorInput] = useState("")

  const handleChange = (event) =>{
    setValorInput(event.target.value);
  }

  const [valorPartido, setValorPartido] = useState("")

  const handlePartidoChange = (event) =>{
    setValorPartido(event.target.value);
  }

  const [valorEstado, setValorEstado] = useState("")

  const handleEstadoChange = (event) =>{
    setValorEstado(event.target.value);
  }
    return <>
    <h2>Lista de Deputados</h2>
    {BuscarDeputados(valorInput, valorPartido, valorEstado)}
    <div className="grid-pesquisa">
      <input type="text" className="nome-deputado" placeholder="Digite o nome do deputado" 
      value={valorInput} onChange={handleChange}/>
      <select name="partidos" id="select-partidos" onChange={handlePartidoChange}>
        <option value=""></option>
        <option value="MDB">MDB</option>
        <option value="PDT">PDT</option>
        <option value="PT">PT</option>
        <option value="PCdoB">PCdoB</option>
        <option value="PSB">PSB</option>
        <option value="PSDB">PSDB</option>
        <option value="AGIR">AGIR</option>
        <option value="MOBILIZA">MOBILIZA</option>
        <option value="CIDADANIA">CIDADANIA</option>
        <option value="PV">PV</option>
        <option value="AVANTE">AVANTE</option>
        <option value="PP">PP</option>
        <option value="PSTU">PSTU</option>
        <option value="PCB">PCB</option>
        <option value="PRTB">PRTB</option>
        <option value="DC">DC</option>
        <option value="PCO">PCO</option>
        <option value="PODE">PODE</option>
        <option value="REPUBLICANOS">REPUBLICANOS</option>
        <option value="PSOL">PSOL</option>
        <option value="PL">PL</option>
        <option value="PSD">PSD</option>
        <option value="SOLIDARIEDADE">SOLIDARIEDADE</option>
        <option value="NOVO">NOVO</option>
        <option value="REDE">REDE</option>
        <option value="PMB">PMB</option>
        <option value="UP">UP</option>
        <option value="UNIÃO">UNIÃO</option>
        <option value="PRD">PRD</option>
      </select>
      <select name="estados" id="select-estados" onChange={handleEstadoChange}>
        <option value=""></option>
        <option value="AC">Acre</option>
        <option value="AL">Alagoas</option>
        <option value="AP">Amapá</option>
        <option value="AM">Amazonas</option>
        <option value="BA">Bahia</option>
        <option value="CE">Ceará</option>
        <option value="ES">Espírito Santo</option>
        <option value="GO">Goiás</option>
        <option value="MA">Maranhão</option>
        <option value="MT">Mato Grosso</option>
        <option value="MS">Mato Grosso do Sul</option>
        <option value="MG">Minas Gerais</option>
        <option value="PA">Pará</option>
        <option value="PB">Paraíba</option>
        <option value="PR">Paraná</option>
        <option value="PE">Pernambuco</option>
        <option value="PI">Piauí</option>
        <option value="RJ">Rio de Janeiro</option>
        <option value="RN">Rio Grande do Norte</option>
        <option value="RS">Rio Grande do Sul</option>
        <option value="RO">Rondônia</option>
        <option value="RR">Roraima</option>
        <option value="SC">Santa Catarina</option>
        <option value="SP">São Paulo</option>
        <option value="SE">Sergipe</option>
        <option value="TO">Tocantins</option>
      </select>
    </div>
    <div className="gridDeputados">
      {filtroNome.map((card) => <Card id ={card.id} nome={card.nome} siglaPartido={card.siglaPartido}
      siglaUf={card.siglaUf} urlFoto={card.urlFoto}/>)}
    </div>
  </>

}

export default Home;