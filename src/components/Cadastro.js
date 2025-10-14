import { useEffect, useRef, useState } from "react";
import { fetchCadastro } from "../api/data";

function Cadastro(){

const [email, setEmail] = useState("");
const [celular, setCelular] = useState("");
const [aviso, setAviso] = useState("");
const [click, setClick] = useState(false)

const isMounted = useRef(false);

useEffect(() => {

    if(!isMounted.current){
        isMounted.current = true;
        return;
    }

    const fetchDados = async() =>{
        try{
        if(email!= "" & celular!= ""){
            if(email.includes("@") && email.includes(".com")){
                const response = await fetchCadastro(email, celular);
                setAviso(response == 201 ? "Cadastrado com Sucesso!": "Algo deu errado")
                
                
            }else{
                setAviso("E-mail inválido")
            }
        }else{
            setAviso("Todos os campos devem estar preenchidos")
        }
        }catch(err){
            console.log(err);
        }

    }

    fetchDados();

}, [click])

const handleClick = (event) =>{
        setClick(!click) 
        }
const handleChangeEmail = (event) =>{
        setEmail(event.target.value)
        }
const handleChangeCelular = (event) =>{
        setCelular(event.target.value)
        }

    return(

        <div>
            <h4>Cadastre seu e-mail e telefone para receber atualizações!</h4>
            <input placeholder="E-mail" type="text" onChange={handleChangeEmail}></input>
            <input placeholder="Celular" type="tel" onChange={handleChangeCelular}></input>
            <button type="submit" style={{width: 100, height: 20}}
            onClick={handleClick}>Cadastrar</button>
            <label>{aviso}</label>

        </div>

    )


}

export default Cadastro;