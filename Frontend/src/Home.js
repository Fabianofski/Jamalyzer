import './components/App.css';
import "./components/Home.css";
import { useNavigate } from "react-router-dom";

function Home() {
  document.title = `Jamalyzer | Home`;
  var input = "";
  const onInputChange = (e) => {
    input = e.target.value;
  };
  const navigate = useNavigate();
  const onSubmit = () => {
    if(!input.startsWith("https://itch.io/jam/")) return;
    const jamName = input.replace("https://itch.io/jam/", "")
    navigate(`/jam/${jamName}`);
  }

  return (
    <div className="Home">
      <h1>Jamalyzer</h1>
      <div className="form">
        <input type="text" placeholder="Enter Jam URL" name="JamURL" autoComplete="off" required onChange={onInputChange}/>
        <button onClick={onSubmit}>Submit</button>
      </div>
    </div>
  );
}

export default Home;