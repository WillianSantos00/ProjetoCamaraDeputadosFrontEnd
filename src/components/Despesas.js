import "./Despesas.css"


function Despesas({ano, mes, tipoDespesa, codDocumento, tipoDocumento, dataDocumento,
    valorDocumento, urlDocumento, nomeFornecedor, cnpjFornecedor, valorLiquido, 
    valorGlosa, numRessarcimento, parcela}){

       
    return <>
    
    <div className="Despesas-container">
        <div className="info-despesas">
            <h4>Ano: {ano}</h4>
            <h4>Mês: {mes}</h4>
            <h4>tipo Despesa:{tipoDespesa}</h4>
            <h4>cod Documento: {codDocumento}</h4>
            <h4>tipo Documento: {tipoDocumento}</h4>
            <h4>data Documento: {dataDocumento}</h4>
            <h4>valor Documento:R${valorDocumento}</h4>
            <h4>url Documento: <a href={urlDocumento}>Link</a></h4>
            <h4>Nome Fornecedor:{nomeFornecedor}</h4>
            <h4>CNPJ Fornecedor:{cnpjFornecedor}</h4>
            <h4>Valor liquido:R${valorLiquido}</h4>
            <h4>Valor Glosa:R${valorGlosa}</h4>
            <h4>Número Ressarcimento:{numRessarcimento}</h4>
            <h4>Parcela:{parcela}</h4>
        </div>
        
    </div>
        
    
    </>
}

export default Despesas;