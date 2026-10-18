import { useState } from 'react'
import './App.css'
import ParticlePortrait from "./ParticlePortrait.jsx";
import logo from "./assets/wallhaven-mlzoy1.png"
function App() {
  return(
      <>
        <div className="top">
          <a href="/">BM </a>
          <a href="/">Home </a>
          <a href="/">About </a>
          <a href="/">Experience</a>
        </div>
        <hr/>
        <div className={"intro"}>
            <p className={"intro-para"}>Hi! i am bibhusan i am a programmer and i do programming for fun!!!</p>
            <br/>
            <img src={logo} alt={"photo"} height={300} width={300} loading={"lazy"}/>
        </div>
        <hr/>
        <div>
            <p>Check out projects that i have done till now</p>
            <a href={"https://github.com/Bibhusan-dot"} target={"_blank"}>Github</a>
        </div>
      </>
      )
}

export default App
