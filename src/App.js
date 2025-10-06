import { useState } from "react";
import dadosResumo from "./api/data";
import Card from "./components/Card";
import "./App.css";
import { Outlet } from "react-router-dom";



function App() {
  
  
  return <>
  <Outlet/>
  </>

}

  


export default App;
