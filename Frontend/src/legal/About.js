import React from "react";

function About () {
  
  document.title = `Jamalyzer | About`;
  
  return(
    <div className="legal-container">
      <div className="legal-view">
        <h1>About</h1>
        <h2>About Jamalyzer</h2>
        <p>
          Welcome to Jamalyzer, your go-to destination for analyzing game jams on itch.io. Our mission is to provide valuable insights and statistics on the game development community by collecting data from various game jams and presenting it in an easy-to-understand format.
          <br/><br/>
          With Jamalyzer, you can browse through the latest game jams, view the top-ranked games and discover a range of different statistics about the games and the teams.
          <br/><br/>
          Whether you're a game developer, a player, or just a fan of the game jam scene, Jamalyzer is the perfect tool for getting a deeper understanding of the games and the people that make them.
          <br/><br/>
          So why wait? Head on over to Jamalyzer now and start exploring the world of game jams on itch.io like never before!
        </p>
        <h2>What is a Game Jam?</h2>
        <p style={{textAlign:"justify", hyphens: "auto"}}>
          A "Game Jam" is a gathering of game developers for the purpose of planning, designing, and creating one or more games within a short period of time, typically ranging from 24 to 72 hours. These events often take place over a weekend and are usually organized by a group of individuals or a game development community.
          <br/><br/>
          Participants in a game jam will often form teams, and each team is typically made up of programmers, artists, and designers. They'll usually have a theme or a set of constraints to inspire the creation of the games. Game Jams is a way to learn, practice and test oneself in a short amount of time and also a perfect opportunity to network with other game developers and build camaraderie within the industry.
          <br/><br/>
          The resulting games from a game jam are often rough prototypes, but they can also be fully functional and polished products. Many of these games go on to be further developed and refined, and some have even been released commercially. Game Jams are a great way for developers to experiment with new ideas and push the boundaries of what's possible in game development.
        </p>
      </div>
    </div>
  );
}

export default About;