import React, { SyntheticEvent, useEffect, useState } from 'react';
import { BiSearchAlt2} from "react-icons/bi";

const Content = () => {

  // states
const [input , setInput] = useState<string>('');
const [task,setTask]= useState<string>("");

const[cidade,setCidade]= useState<string>("");
const[temperatura,setTemperatura]= useState<string>("");
const[estado,setEstado]= useState<string>("");
const[umidade,setUmidade]= useState<string>("");
const[vento,setVento]= useState<string>("");


const apiKey = "b06affb3e8bf91f524b4413d9a4ca002";


  const apiUnsplash = "https://source.unsplash.com/1600x900/?";

  const getWeatherData = async (city:String) => {

  const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;
  const res = await fetch(apiWeatherURL);
  const data = await res.json();

  if(data.cod==="404"){
    alert("Digite uma cidade valida");
    setCidade("");
    setTemperatura("");
    setUmidade("")
    setVento("")
    setEstado("")
  }
  else{
  setCidade(data.name)
  setTemperatura(data.main.temp)
  setUmidade(data.main.humidity);
  setVento(data.main.pressure);
  setEstado(data.weather[0].description);
  }
  console.log(data);
  return data;
};



 const handleClick=(e:SyntheticEvent)=>{
    e.preventDefault();
    if (input ==="") {
      alert("Digite o nome de uma cidade")
      return
    }
    getWeatherData(input)
   
    }


  return (
    <div className="container">
      <h3>Confira o clima de uma cidade:</h3>
      <div className='form form-input-container'>
        <form >
          <input type="text" 
            placeholder='Digite o nome da cidade'
            onChange={(e)=>setInput(e.target.value)}
            />
            <button onClick={handleClick}>
            <BiSearchAlt2 />
            </button>
            </form>
      </div>
      <div className='weather-data'> 
       {cidade===""? ""
       : 
       <h2>
        <i className="fa-solid fa-location-dot"></i>
          <span className='city'>{cidade}</span>
        </h2>}
       {temperatura===""?""
       : 
       <p className='temperatura'> <span>{temperatura}</span>&deg;C </p>}
      <div className='descricao'>
        <p className='text-descricao'>{estado}</p>
        <img src="" alt="" />
      </div>
      <div className='details-container'>
        {
          umidade===""?""
          :
          <p className='umidity'>
          <i className='fa-solid fa-droplet'></i>
          <span>{`${umidade}%`}</span>
        </p>}

        {
          vento===""?""
          :
          <p className='wind'>
          <i className='fa-solid fa-wind'></i>
          <span>{`${vento}km/h`}</span>
        </p>}
      </div>
      
      </div>
  </div>
  )
  }

export default Content