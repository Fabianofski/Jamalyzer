"use client";
import { useRouter } from "next/navigation";
import React, { ReactElement, useState } from "react";
import ReactGA from "react-ga4";
import { jamCard } from "@/model/jamData/jamCard";
import jamList from "../public/jamList.json";

// function shuffle(array: jamCard[]): jamCard[] {
//   for (let i = array.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [array[i], array[j]] = [array[j], array[i]];
//   }
//   return array;
// }

const jams = jamList.jams;

function Home(): ReactElement {
  let input = "";
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    input = e.target.value;
  };
  const onSubmit = (): void => {
    if (!input.startsWith("https://itch.io/jam/")) {
      setError("Invalid URL");
      return;
    }
    const jamName = input.replace("https://itch.io/jam/", "");
    if (ReactGA.isInitialized)
      ReactGA.event({
        category: "Jam Analysis",
        action: "Analyze custom jam",
        label: jamName,
      });
    router.push(`/jam/${jamName}`);
  };

  return (
    <div className="Home">
      <title>Jamalyzer | Home</title>
      <div className="banner"></div>
      <div className="form">
        <input
          type="text"
          placeholder="https://itch.io/jam/..."
          name="JamURL"
          autoComplete="off"
          required
          onChange={onInputChange}
        />
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
        <div className="recommended-mask">
          <div className="recommended jam-left-slide">
            {jams.map((element: jamCard, idx: number) => {
              return <Jam jamInfo={element} key={idx} />;
            })}
            {jams.slice(0, 20).map((element: jamCard, idx: number) => {
              return <Jam jamInfo={element} key={idx} />;
            })}
          </div>
          <div className="recommended-gradient"></div>
        </div>
      </div>
      <AboutSection />
    </div>
  );
}

function Jam({ jamInfo }: { jamInfo: jamCard }): ReactElement {
  const onSubmit = (): void => {
    if (ReactGA.isInitialized)
      ReactGA.event({
        category: "Jam Analysis",
        action: "Analyze recommended jam",
        label: jamInfo.name,
      });
  };

  return (
    <div className="recommended-jam">
      <div className="primary-info">
        <a
          href={jamInfo.link}
          target="_blank"
          rel="noopener noreferrer"
          className="jam-icon"
        >
          <img
            className="jam_cover"
            src={jamInfo.icon}
            alt={`Icon: ${jamInfo.name}`}
          />
        </a>
        <a
          href={jamInfo.link}
          target="_blank"
          rel="noopener noreferrer"
          className="title"
        >
          <h3>{jamInfo.name}</h3>
        </a>
      </div>
      <div className="host">
        Hosted by&nbsp;
        {jamInfo.hosts
          .map((element, idx) => {
            return (
              <a
                href={element.profile_link}
                target="_blank"
                rel="noopener noreferrer"
                key={idx}
              >
                {element.name}
              </a>
            );
          })
          .reduce((prev, curr, idx) => (
            <React.Fragment key={idx}>{[prev, ", ", curr]}</React.Fragment>
          ))}
      </div>
      <div className="stats">
        <div className="joined">
          <p> {jamInfo.joined} joined</p>
        </div>
        <div className="submissions">
          <p> {jamInfo.submitted} Submissions</p>
        </div>
      </div>
      <a
        href={`/jam/${jamInfo.link.replace("https://itch.io/jam/", "")}`}
        onClick={onSubmit}
        className="submit"
      >
        ANALYZE
      </a>
    </div>
  );
}

function AboutSection() {
  return (
    <div className="about-container">
      <div className="about-row">
        <div className={"about-image"}>
          <img
            className="jam_cover"
            src="https://img.itch.zone/aW1nLzY1ODQ2NDUucG5n/140x111%23/%2FqT7FN.png"
            alt="Icon: Brackeys Game Jam 2021.2"
          ></img>
        </div>
        <div className="about-text">
          <h2>Jamalyzer</h2>
          <p>
            With Jamalyzer, you can browse through the latest game jams, view
            the top-ranked games and discover a range of different statistics
            about the games and the teams.
            <br />
            <br />
            Whether you&#39;re a game developer, a player, or just a fan of the
            game jam scene, Jamalyzer is the perfect tool for getting a deeper
            understanding of the games and the people that make them.
          </p>
        </div>
      </div>
      <div className="about-row">
        <div className="about-text">
          <h2>Game Jam</h2>
          <p>
            A &#34;Game Jam&#34; is a gathering of game developers for the
            purpose of planning, designing, and creating one or more games
            within a short period of time, typically ranging from 24 to 72
            hours. These events often take place over a weekend and are usually
            organized by a group of individuals or a game development community.
            <br />
            <br />
            Participants in a game jam will often form teams, and each team is
            typically made up of programmers, artists, and designers.
            They&#39;ll usually have a theme or a set of constraints to inspire
            the creation of the games. Game Jams is a way to learn, practice and
            test oneself in a short amount of time and also a perfect
            opportunity to network with other game developers and build
            camaraderie within the industry.
          </p>
        </div>
        <div className={"about-image"}>
          <img
            className="jam_cover"
            src="https://img.itch.zone/aW1nLzY1ODQ2NDUucG5n/140x111%23/%2FqT7FN.png"
            alt="Icon: Brackeys Game Jam 2021.2"
          ></img>
        </div>
      </div>
    </div>
  );
}

export default Home;
