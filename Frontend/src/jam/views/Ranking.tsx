import React, { ReactElement, useState } from "react";
import Pagination from "../components/Pagination";
import "./View.css";
import "../components/PaginationTable.css";
import { jamData } from "../../model/jamData";
import { entry, entry_criteria } from "../../model/entry";

function Ranking({ jamData }: { jamData: jamData }): ReactElement {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

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
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

interface TableBodyProps {
  jamData: jamData;
  indexOfFirstPost: number;
  indexOfLastPost: number;
}

function TableBody({ jamData, indexOfFirstPost, indexOfLastPost }: TableBodyProps): ReactElement {
  let tableEntry = 0;
  return (
    <>
      {Object.entries(jamData.rankings.Overall).map(([rank, ids]) => {
        return ids.map((id) => {
          tableEntry++;
          if (tableEntry <= indexOfFirstPost || tableEntry > indexOfLastPost) return <></>;
          const entry = jamData.jam_games[id];
          return <TableEntry key={id} jamData={jamData} entry={entry} id={id} rank={rank} />;
        });
      })}
    </>
  );
}

interface TableEntryProps {
  jamData: jamData;
  entry: entry;
  id: number;
  rank: string;
}

function TableEntry({ jamData, entry, id, rank }: TableEntryProps): ReactElement {
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

function Title({ entry }: { entry: entry }): ReactElement {
  return (
    <td>
      <a href={entry.jamPageUrl} target="_blank" rel="noopener noreferrer">
        {entry.title}
      </a>
    </td>
  );
}

interface CriteriaScoresProps {
  jamData: jamData;
  entry: entry;
}

function CriteriaScores({ jamData, entry }: CriteriaScoresProps): ReactElement {
  return (
    <>
      {jamData.criteria.map((criteria, index) => {
        const crit = entry.criteria.find((c: entry_criteria) => c.name === criteria);
        if (crit) return <td key={index}>{crit.score.toFixed(2)}</td>;
        else return <td key={index}>-</td>;
      })}
    </>
  );
}

function Header({ jamData }: { jamData: jamData }): ReactElement {
  return (
    <thead>
      <tr>
        <th>RANK</th>
        <th>TITLE</th>
        {jamData.criteria.map((criteria, index) => (
          <th className={criteria.length > 30 ? "long-criteria" : ""} key={index}>
            {criteria.toUpperCase()}
          </th>
        ))}
        <th>RATINGS</th>
        <th>RATED</th>
        <th>KARMA</th>
      </tr>
    </thead>
  );
}

export default Ranking;
