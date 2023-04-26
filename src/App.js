import React from "react";
import Die from "./Die";
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'

const App = () => {
  const generateNewDie = ()=>{
   return {
      value: Math.ceil(Math.random() *6), 
      isHeld: false,
      id: nanoid()
    }
  }

  const allNewDice = ()=>{
    let newDice = []
   for(let i=0; i<10; i++){
      newDice.push(generateNewDie())
    }
    return newDice
    
  }
  
  const rolldice = ()=>{
   if(!tenzies) {setDice(oldDice => oldDice.map(die =>{
      return die.isHeld ? 
      die :
      generateNewDie()
      {}
    }))
  }else{
    setTenzies(false)
    setDice(allNewDice())
  }
  }
  const holdDice = (id) =>{ 
       setDice(oldDice => oldDice.map(die =>{
        return die.id === id ?
           {...die, isHeld: !die.isHeld} : 
            die 
        }))
    }
  
  const [dice,setDice] =React.useState(allNewDice())
  const [tenzies, setTenzies] =React.useState(false)
  
  React.useEffect(() =>{
  const allHeld = dice.every(die => die.isHeld) 
  const firstValue = dice[0]. value
  const allSamevalue = dice.every(die => die.value === firstValue)
  if(allHeld && allSamevalue){
    setTenzies(true)
    console.log("You won")
  }
  },[dice])

  const diceElements = dice.map(die =>
     <Die 
    key = {die.id} 
    value={die.value}
    isHeld={die.isHeld}
    holdDice={ ()=> holdDice(die.id)}
    />
    )
    
  

    
  return (
    <main> 
      {tenzies && <Confetti style={{margin: "0 auto", width: "50%"}}/>}
       <h1 className="title">Tenzies</h1>
        <p className="instructions">{tenzies ? "You Won 🏆" : "Roll until all dice are the same. Click each die to freeze it at its current value between rolls."}</p>
      <div className="dice-container" >
        {diceElements}
      </div>
      <button className="roll-dice" onClick={rolldice}>{tenzies ? "New Game" : "Roll"}</button>
    </main>
  )
}

export default App