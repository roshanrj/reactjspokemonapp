import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import {InputBox,PokemonCard,SearchResults} from './components/common';
import "./css/style.css";
import {locStorage,genRandomNumber,cookie} from './utils';

const Pokemon = () => {
  const minPokemonCount = 1,
        maxPokemonCount = 964,
        getAllPokemonListUrl = 'https://pokeapi.co/api/v2/pokemon/?limit='+maxPokemonCount,
        searchPokemonUrl = 'https://pokeapi.co/api/v2/pokemon/',
        [inputValue,setInputValue] = useState(""),
        [searchPokemon,setSearchPokemon] = useState(""),
        [randomPokemon,setRandomPokemon] = useState(""),
        [randomPokemonDetails,setRandomPokemonDetails] = useState(""),
        [searchPokemonDetails,setSearchPokemonDetails] = useState(""),
        [searchPokemonFound,setSearchPokemonFound] = useState(false),
        [randomPokemonFound,setRandomPokemonFound] = useState(false),
        [loading,setLoading] = useState(false);

  useEffect(()=>{
    let pokemonList = locStorage.get('pokemonList'); 
    if(pokemonList){
      checkAndGenRandomCard();
      return;
    }
    axios.get(getAllPokemonListUrl).then(response => {
      if(response.status == 200)
      runOnce(response);
    });
  },[]);

  useEffect(()=>{
    if(randomPokemon.length){
      axios.get(searchPokemonUrl + randomPokemon).then(response => {
        if(response.status == 200){
          setRandomPokemonDetails(response.data);
          setRandomPokemonFound(true);
          locStorage.set('randomCard',response.data);
          cookie.setCookie('isRandomCardShowed','yes'); //setting the cookie for 1 day
        }
      });
    }
  },[randomPokemon]);

  useEffect(()=>{
    if(searchPokemon.length){
      axios.get(searchPokemonUrl + searchPokemon).then(response => {
        if(response.status == 200){
          setSearchPokemonDetails(response.data);
          setLoading(false);
          setSearchPokemonFound(true);
        }
      });
    }
  },[searchPokemon]);



  const runOnce = (response) => {
    let pokemonList = response.data.results; //global variable
    locStorage.checkStorage() && locStorage.set('pokemonList',pokemonList);
    checkAndGenRandomCard(response);
  }

  const checkAndGenRandomCard = (response) => {
    if(!cookie.getCookie('isRandomCardShowed')){
      var pokemonList = locStorage.get('pokemonList'),
          randomNumber = genRandomNumber(minPokemonCount,maxPokemonCount),
          randomGenPokemon = pokemonList[randomNumber] && pokemonList[randomNumber].name || '';
        setRandomPokemon(randomGenPokemon);
    }else{
      var randomCardData = locStorage.get('randomCard');
      setRandomPokemonDetails(randomCardData);
      setRandomPokemonFound(true);
    }
  }

  const onInputChangeHandler = (event) =>{
    let currentValue = event.target.value.trim().toLowerCase();
    setInputValue(currentValue);
    setTimeout(()=>{
      setSearchPokemonFound(false);
      if(!(/(^[a-z\s]*$)/i.test(currentValue))) return;
        let pokemonList = locStorage.get('pokemonList'),
            matchResults = pokemonList && pokemonList.filter(val=>val.name == currentValue);
        if(matchResults.length){
          setSearchPokemon(currentValue);
        }

    },1000);
  }

  return (
    <Fragment>
      <div className="input-wrapper">
        <InputBox changeEvent={onInputChangeHandler} initialValue={inputValue}/>
      </div>
      <div className="clear20"></div>
      {loading && <div>Loading...</div>}
      {!loading &&
        (<div>
          <div className="search-results">Search Results: </div>
          <div className="wrapper">
            <SearchResults details={searchPokemonDetails} pokemonFound={searchPokemonFound}/>
            <PokemonCard details={searchPokemonDetails} pokemonFound={searchPokemonFound}/>
          </div>
        </div>
        )
      }
      <div className="clear20"></div>
      <Fragment>
        <div className="random-card">Random Card :</div>
        <div className="wrapper">
          <SearchResults details={randomPokemonDetails} pokemonFound={randomPokemonFound}/>
          <PokemonCard details={randomPokemonDetails} pokemonFound={randomPokemonFound}/>
        </div>
      </Fragment>
    </Fragment>
  )
}

export default Pokemon;
