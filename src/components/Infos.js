import "./Infos.css"


function Infos({urlFoto, nomeCivil, siglaPartido, siglaUf, email, situacao, cpf, sexo, 
    redeSocial, escolaridade, dataNascimento, telefone, resumoIA}){

    return(
        
    <div className="Infos-container">
        <img className="info-img" src={urlFoto}></img>
        <div className="detalhes">
            <h3>Nome Civíl: {nomeCivil}</h3>
            <h3>Partido: {siglaPartido}</h3>
            <h3>Estado:{siglaUf}</h3>
            <h3>E-mail: {email}</h3>
            <h3>Telefone: {telefone}</h3>
            <h3>Situação: {situacao}</h3>
            <h3>CPF: {cpf}</h3>
            <h3>Sexo: {sexo}</h3>
            <h3>Redes Sociais:</h3>
            <ul>
                {redeSocial.map((item)=> <li>{item}</li>)}
            </ul>
            <h3>Escolaridade: {escolaridade}</h3>
            <h3>Data de Nascimento: {dataNascimento}</h3>
            <h3>{resumoIA}</h3>

        </div>
    </div>
    )
   
}

export default Infos