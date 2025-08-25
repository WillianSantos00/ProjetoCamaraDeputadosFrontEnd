import { useState } from "react";
import deputados from "./db/data";
import Card from "./components/Card";
import "./App.css";
import { Outlet } from "react-router-dom";



function App() {
  
  
  return <>
  <Outlet/>
  </>

}

  


export default App;
