import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import Ranking from './views/Ranking';
import Karma from './views/Karma';

function Jam() {
  const { id } = useParams();  
  const [entries, setEntries] = useState([]);
  const [results, setResults] = useState([]); 

  useEffect(()=>{
    fetch(`https://itch.io/jam/${id}/entries.json`)
    .then(response => response.json())
    .then(data => setEntries(data.jam_games));
    fetch(`https://itch.io/jam/${id}/results.json`)
    .then(response => response.json())
    .then(data => setResults(data.results));
  }, [id, results, entries])
  

  return (
    <div className="App">
      <Ranking entries={entries} results={results}/>
      <Karma entries={entries} results={results}/>
    </div>
  );
}

export default Jam;