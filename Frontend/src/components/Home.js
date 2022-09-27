import './App.css';
import { useNavigate } from "react-router-dom";

function Home() {

  var input = "";
  const onInputChange = (e) => {
    input = e.target.value;
  };
  const navigate = useNavigate();
  const onSubmit = () => 
    fetch(`http://localhost:3001/api/jamid?jamurl=${input}`)
    .then(response => response.json())
    .then(fetchedData => {
      navigate(`/jam/${fetchedData}`);
  });

  return (
    <div className="App">
      <h1>Jamalyzer</h1>
      <div className="form">
        <input type="text" placeholder="Enter Jam URL" name="JamURL" autoComplete="off" required onChange={onInputChange}/>
        <button onClick={onSubmit}>Submit</button>
      </div>
    </div>
  );
}

export default Home;