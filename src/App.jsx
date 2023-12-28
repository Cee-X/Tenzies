
import { useState } from 'react'  
import { useEffect } from 'react'
import './App.css'
import Title from './components/Title'
import BodyText from './components/BodyText'
import Button from './components/Button'
import Dice from './components/Dice'
import {nanoid} from 'nanoid'
import Confetti from 'react-confetti'
import { useRef } from 'react'
function App() {

    function rollDice(){
      const diceNumber = []
      for(let i = 0; i < 10; i++){
        const randomNumber = Math.floor(Math.random() * 6 ) + 1
        diceNumber.push({
          value : randomNumber,
          isHeld : false,
          id : nanoid()
          })
      }
      return diceNumber
    }
    
    const [startTime, setStartTime] = useState(null);
    const [winTime, setWinTime] = useState(null);
    const [bestTime, setBestTime]= useState(localStorage.getItem('bestTime') || Infinity)

    const timerRef = useRef(null);

    const [dices, setDices ] = useState(rollDice())
    const [Tenzies, setTenzies] = useState(false)
    const [count, setCount ] = useState(0)

  //write the useEffect hook that will update the timer to win the game 
  useEffect(() => {
    if (Tenzies && startTime) {
      const endTime = new Date();
      const elapsedTime = (endTime - startTime) / 1000;
      setWinTime(elapsedTime); // Calculate time in seconds
      if(elapsedTime < bestTime){
        setBestTime(elapsedTime)
        localStorage.setItem('bestTime', elapsedTime)
      }
      clearInterval(timerRef.current);
    }
  }, [Tenzies, startTime, bestTime]);

    const startTimer = () => {
    setStartTime(new Date());
    timerRef.current = setInterval(() => {}, 1000); // Dummy setInterval to keep the component alive
    };

    useEffect(()=>{
      const sameValue= dices.every(dice => dice.value === dices[0].value ) 
      const allHeld = dices.every(dice => dice.isHeld)
      if(sameValue && allHeld){
        setTenzies(true)
        clearInterval(timerRef.current);
      }
    },[dices])

    const handleClick = () => {
      if(!Tenzies){
        setDices(oldDices => oldDices.map(dice => {
          return dice.isHeld ? dice : {...dice, value : Math.floor(Math.random() * 6 ) + 1}
        }))
        setCount(prevCount => prevCount + 1)
        if(!startTime){
          startTimer();
        }
      }else {
        setTenzies(false)
        setDices(rollDice())
        setCount(0)
        setStartTime(null)
      }
    }

    const heldDice = (id) => {
      setDices(oldDices => 
        oldDices.map(dice => {
          return dice.id === id ? 
          {...dice, isHeld: !dice.isHeld}
           :
           dice  
        })
      )
      
    }



    const DicesElement = dices.map((dice) => 
      <Dice key={dice.id} value={dice.value} isHeld={dice.isHeld}  heldDice={()=>heldDice(dice.id)}/> 
    )
    
   
  return (
    <main className='main-page'>
      {Tenzies && <Confetti />}
      <Title />
      <BodyText />
      <h3 className='count'>You clicked {count} {count > 1 ? "times." : "time."}</h3>
      <h3 className='count'>Best time is {bestTime === Infinity? 'N/A' : bestTime + 'seconds'} </h3>
      <h4 className='count'>You will see your game win time below at the end of the game.</h4>
      {winTime && <p className='count'>Time to Win: {winTime} seconds</p>}
      <main className='dice-container-wrapper'>
        <div className='dice-container'>
          {DicesElement}
        </div>
      </main>
      <Button onClick={handleClick} isTenzie={Tenzies} />
    </main>
  )
}

export default App
