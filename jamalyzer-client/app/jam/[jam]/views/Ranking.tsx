"use client";
import React, { ReactElement, useState } from "react";
import Pagination from "../components/Pagination";
import { jamData } from "@/model/jamData/jamData";
import { entry, entry_criteria } from "@/model/jamData/entry";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import styles from "@/styles/jam/components/PaginationTable.module.css";
import viewStyles from "@/styles/jam/views/View.module.css";

function Ranking({ jamData }: { jamData: jamData }): ReactElement {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  return (
    <div className={`${viewStyles.view} ${styles.ranking}`} id="Ranking">
      <h1>Ranking</h1>
      <div className={styles["table-wrapper"]}>
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

function TableBody({
  jamData,
  indexOfFirstPost,
  indexOfLastPost,
}: TableBodyProps): ReactElement {
  let mappedIds = 0;
  let tableEntries = 0;
  const fillMissingRows = (tableEntries: number): ReactElement[] => {
    const rows = [];
    for (let i = tableEntries; i < 10; i++) {
      rows.push(<EmptyTableEntry jamData={jamData} key={i} />);
    }
    return rows;
  };

  return (
    <>
      {Object.entries(jamData.rankings.Overall).map(([rank, ids]) => {
        return ids.map((id) => {
          mappedIds++;
          if (mappedIds <= indexOfFirstPost || mappedIds > indexOfLastPost)
            return "";
          const entry = jamData.jam_games[id];
          tableEntries++;
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
      })}
      {fillMissingRows(tableEntries)}
    </>
  );
}

interface TableEntryProps {
  jamData: jamData;
  entry: entry;
  id: number;
  rank: string;
}

function TableEntry({
  jamData,
  entry,
  id,
  rank,
}: TableEntryProps): ReactElement {
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

function EmptyTableEntry({ jamData }: { jamData: jamData }): ReactElement {
  return (
    <tr>
      <td>-</td>
      <td>-</td>
      {jamData.criteria.map((criteria, index) => {
        return <td>-</td>;
      })}
      <td>-</td>
      <td>-</td>
      <td>-</td>
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
        const crit = entry.criteria.find(
          (c: entry_criteria) => c.name === criteria
        );
        if (crit !== undefined)
          return (
            <td key={index} style={{ textAlign: "right" }}>
              {crit.score.toFixed(2)}
              <FontAwesomeIcon
                icon={faStar}
                style={{
                  marginLeft: ".3rem",
                  color: "var(--primary-color)",
                  height: "1rem",
                }}
              />
            </td>
          );
        else
          return (
            <td key={index} style={{ textAlign: "right" }}>
              -
            </td>
          );
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
          <th
            className={criteria.length > 30 ? styles["long-criteria"] : ""}
            key={index}
          >
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
