import '../App.css';
import "./Home.css";
import { useNavigate } from "react-router-dom";
import {useEffect, useState} from "react";
import {ResetToDefaultColors} from "../components/ColorManager";
import ReactGA from "react-ga4";

const dummyJam = {
  "name":"Loading..",
  "icon":"jam-loading.png",
  "link":"https://f4b1.itch.io",
  "hosts":[{"name":"F4B1","profile_link":"https://f4b1.itch.io"}],
  "time":"2022-07-24T19:00:00Z",
  "joined":"69k",
  "submitted":"69,420"}
const dummyJamArray = [];
for (let i = 1; i <= 50; i++) {
  dummyJamArray.push(dummyJam);
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array
}

function Home() {
  document.title = `Jamalyzer | Home`;
  ResetToDefaultColors();
  let input = "";
  const [error, setError] = useState("");
  const [jams, setJams] = useState(dummyJamArray);
  
  useEffect(()=>{
    fetch("/api/jamList")
      .then((response) => response.json())
      .then((json) =>
        setJams(shuffle(json.jams))
      )
  }, []);
  
  const onInputChange = (e) => {
    input = e.target.value;
  };
  const navigate = useNavigate();
  const onSubmit = () => {
    if(!input.startsWith("https://itch.io/jam/")) {
      setError("Invalid URL");
      return;
    }
    const jamName = input.replace("https://itch.io/jam/", "")
    if(ReactGA.isInitialized)
      ReactGA.event({
        category: "Jam Analysis",
        action: "Analyze custom jam",
        label: jamName,
      })
    navigate(`/jam/${jamName}`);
  }

  return (
    <div className="Home">
      <div className="form">
        <h1>Analyze your Jam!</h1>
        <input type="text" placeholder="https://itch.io/jam/..." name="JamURL" autoComplete="off" required onChange={onInputChange}/>
        <div className="error">
          <p> {error} </p>
        </div>
        <button onClick={onSubmit} className="submit">
          <div>
            <p>ANALYZE</p>
          </div>
        </button>
      </div>
      <div className="recommended-container">
        <h1>Recommended:</h1>
        <div className="recommended-mask">
          <div className="recommended">
            {
              jams.map((element, idx)=>{
                return ( <Jam jamInfo={element} key={idx}/> );
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
}

function Jam({jamInfo}) {
  const navigate = useNavigate();
  const onSubmit = () => {
    if(ReactGA.isInitialized)
      ReactGA.event({
        category: "Jam Analysis",
        action: "Analyze recommended jam",
        label: jamInfo.name,
      })
    navigate(`/jam/${jamInfo.link.replace("https://itch.io/jam/", "")}`);
  }
  
  return(
    <div className="recommended-jam">
      <div className="primary-info">
        <a href={jamInfo.link} target="_blank" rel="noopener noreferrer" className="jam-icon">
          <img className="jam_cover"
           src={jamInfo.icon} alt={`Icon: ${jamInfo.name}`} />
        </a>
        <a href={jamInfo.link} target="_blank" rel="noopener noreferrer" className="title">
          <h3>{jamInfo.name}</h3>
        </a>
      </div>
      <div className="host">
        Hosted by&nbsp;
        {
          jamInfo.hosts.map((element, idx) => {
            return(
              <a href={element.profile_link} target="_blank" rel="noopener noreferrer" key={idx}>{element.name}</a>
            );
          }).reduce((prev, curr) => [prev, ', ', curr])
        }
      </div>
      <div className="stats">
        <div className="joined">
          <p> {jamInfo.joined} joined</p>
        </div>
        <div className="submissions">
          <p> {jamInfo.submitted} Submissions</p>
        </div>
      </div>
      <button onClick={onSubmit} className="submit">
        <div>
          <p>ANALYZE</p>
        </div>
      </button>
    </div>
  );
}

export default Home;