import React, { useState,useEffect } from "react";
import axios from "axios";
import './CharacterSearch.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export const CharacterSearch=()=>{

  const [characterName,setCharacterName] = useState('');
  const [characterInfo,setCharacterInfo] = useState(null);
  
    const fetchData = async()=>{
      const variables = { search:characterName.trim().toLowerCase() };
      const query=`
        query($search:String){
          Character(search: $search){
            id
            name{ first last }
            description
            image{ large }
          } 
        }
      `;
      try{
        const resp = await axios.post( 'https://graphql.anilist.co',{query,variables} );
        setCharacterInfo( resp.data.data.Character );
      } catch(error){ console.error('Error fetching data:',error); }
    };
  useEffect( ()=>{
    //to Debounce the API call
    const timerId = setTimeout(  () => {if(characterName)fetchData();},500  );
    return()=> clearTimeout(timerId);
  }, [characterName]);

  return(
    <div className="container text-center">
      <div className="search-box">
        <div className="form-control">
          <input className="form-control"
            type="text"
            value={characterName}
            onChange={ (e)=>setCharacterName(e.target.value) }
            placeholder="Enter Character name"
          />
        </div>
        { characterInfo && (
          <div className="character-info">
            <h2>{`${characterInfo.name.first} ${characterInfo.name.last}`}</h2>
            <img 
              className="character-large"
              src={characterInfo.image.large} alt={characterInfo.name.first}               
            />
            <p className="character-description">{characterInfo.description}</p>          
          </div>
        )}
      </div>
    </div>
  );

};