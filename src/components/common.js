import React,{Fragment} from 'react';

export const InputBox = ({changeEvent,initialValue}) => {
    return (
        <form>
            <label htmlFor="pokemon-search">Pokemon Search Box:</label><input type="text" id= "pokemon-search" onChange={changeEvent} value={initialValue} placeholder="Ex: pikachu" maxLength="15" autoFocus/>
        </form>
    );
}

export const SearchResults = ({details,pokemonFound}) => {
    return (
        <Fragment>
            {
            !pokemonFound ? <div>No Pokemon Found! </div> : 
            (
            <div className="top-wrapper">
                <div className="image-wrapper">
                    <div className="poke-name-num">
        <span className="name pokemon-info">{details.forms[0].name.toUpperCase()}</span>
                    </div>
                    <div className="size">
        <span className="pokemon-info"><span className="pokemon-weight">Weight: {details.weight}</span></span>
                        <span className="pokemon-info"><span className="pokemon-height">Height: {details.height}</span></span>
                    </div>
                    <img src={details.sprites.front_default} alt="Pokemon front image" id="pokemonImage"/>
                    <div id="types">
                    {details.types.map((val,index)=><div key={index} className={"pokemonType pokemon-info "+val.type.name}>{val.type.name}</div>)}
                    </div>
                </div>
            </div>
            )}
        </Fragment>
    );
}

export const PokemonCard= ({details,pokemonFound}) => {
    return (
        <Fragment>
        {
        pokemonFound &&  
        (<div className="bottom-wrapper">
        <table>
            <thead>
                <tr><th>Base</th><th>Statistics</th></tr>
            </thead>
            <tbody>
                <tr><td>HP:</td><td className="hp">{details.stats[5].base_stat}</td></tr>
                <tr><td>Attack:</td><td className="attack">{details.stats[4].base_stat}</td></tr>
                <tr><td>Defense:</td><td className="defense">{details.stats[3].base_stat}</td></tr>
                <tr><td>Special Attack:</td><td className="special-attack">{details.stats[2].base_stat}</td></tr>
                <tr><td>Special Defense:</td><td className="special-defense">{details.stats[1].base_stat}</td></tr>
                <tr><td>Speed:</td><td className="speed">{details.stats[0].base_stat}</td></tr>
            </tbody>
        </table>
      </div>
        )}
      </Fragment>
    );
}


