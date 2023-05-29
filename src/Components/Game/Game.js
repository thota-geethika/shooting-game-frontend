import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './game.css'

function Game() {

    const [heroHealth,setHeroHealth] = useState(0);
    const [villainHealth,setVillainHealth] = useState(0);

    async function fetchHeroHealth() { 
        await axios.get("http://localhost:8080/api/heroHealth").then((response) => {
        setHeroHealth(response.data)})
    }
    
    async function fetchVillainHealth() { 
        await axios.get("http://localhost:8080/api/villainHealth").then((response) => {
        setVillainHealth(response.data)})
    }

    async function onHeroShoots(){
        await axios.put("http://localhost:8080/api/shoots/villain").then( (response) => {
            setVillainHealth(response.data);
        })
    }

    async function onVillainShoots(){
        await axios.put("http://localhost:8080/api/shoots/hero").then( (response) => {
            setHeroHealth(response.data);
        }) 
    }
    
    async function changeArmourState(){
        await axios.put("http://localhost:8080/api/villain/armour")
    }

    // fetchHeroHealth();
    useEffect(() => {
         fetchHeroHealth();
         fetchVillainHealth();  
    },[])
    
  return (
    <div>

        <div className='container'>

            <div className='item1'>
            <label htmlFor="heroHealthValue" data-testid="heroHealthText">Hero Health: </label>
            <span data-testid="heroHealthValue">{heroHealth}</span>
            </div>
            <div className='item2'>
            <label htmlFor="heroHealthValue" data-testid="villainHealthText">Villain Health: </label>
            <span data-testid="villainHealthValue">{villainHealth}</span>
            </div>
        </div>

        <div className='container'>
            <h2>Hero</h2>
            {/* <img src="" alt="" /> */}
            <h2>Villain</h2>
            {/* <img src="" alt="" /> */}
        </div>

        <div className='container'>
            <button data-testid="heroShootButton" onClick={onHeroShoots}>Shoot</button>
            <div className='villainButtons'>
                <button data-testid="villainShootButton" id='villainShoot' onClick={onVillainShoots}>Shoot</button>
                <button data-testid="villainArmour" onClick={changeArmourState} >Armour</button>
            </div>
        </div>

    </div>
  )
}

export default Game
