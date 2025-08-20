import "./Card.css"

function Card({id, nome, siglaPartido, siglaUf, urlFoto}){

    
    return(
    <div className="card-container">
        <div className="card">
            <img className="card-img"src={urlFoto} alt="Deputado" />
            <div className="card-details">
            <h3>{nome}</h3>
            <h3>{siglaPartido}</h3>
            <h3>{siglaUf}</h3>
            </div>
        </div>  
    </div>
    )

}

export default Card