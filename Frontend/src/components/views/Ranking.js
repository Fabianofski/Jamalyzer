import React, { useState } from "react";
import Pagination from "./Pagination";
import "./View.css";

function Ranking({ jamData }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="view" id="Ranking">
      <h1>Ranking</h1>
      <div className="table-wrapper">
        <table>
          <Header jamData={jamData} />
          <tbody>
            <TableBody
              jamData={jamData}
              indexOfFirstPost={indexOfFirstPost}
              indexOfLastPost={indexOfLastPost}
            />
          </tbody>
        </table>
      </div>
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={Object.entries(jamData.jam_games).length}
        currentPage={currentPage}
        paginate={paginate}
      />
    </div>
  );
}

function TableBody({ jamData, indexOfFirstPost, indexOfLastPost }) {
  let tableEntry = 0;
  return Object.entries(jamData.rankings.Overall).map(([rank, ids]) => {
    return ids.map((id) => {
      tableEntry++;
      if (tableEntry <= indexOfFirstPost || tableEntry > indexOfLastPost)
        return;
      const entry = jamData.jam_games[id];
      return (
        <TableEntry
          key={id}
          jamData={jamData}
          entry={entry}
          id={id}
          rank={rank}
        />
      );
    });
  });
}

function TableEntry({ jamData, entry, id, rank }) {
  return (
    <tr key={id}>
      <td>#{rank}</td>
      <Title entry={entry} />
      <CriteriaScores jamData={jamData} entry={entry} />
      <td>{entry.rating_count}</td>
      <td>{entry.ratings_given}</td>
      <td>{entry.karma}</td>
    </tr>
  );
}

function Title({ entry }) {
  return (
    <td>
      <a href={entry.jamPageUrl} target="_blank" rel="noopener noreferrer">
        {entry.title}
      </a>
    </td>
  );
}

function CriteriaScores({ jamData, entry }) {
  return jamData.criteria.map((criteria, index) => {
    const crit = entry.criteria.find((c) => c.name == criteria);
    if (crit) return <td key={index}>{crit.score.toFixed(2)}</td>;
    else return <td key={index}>-</td>;
  });
}

function Header({ jamData }) {
  return (
    <thead>
      <tr>
        <th>Rank</th>
        <th>Title</th>
        {jamData.criteria.map((criteria, index) => (
          <th key={index}>{criteria}</th>
        ))}
        <th>Ratings</th>
        <th>Rated</th>
        <th>Karma</th>
      </tr>
    </thead>
  );
}

export default Ranking;
