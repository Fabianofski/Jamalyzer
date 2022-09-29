import React from "react";
import "./View.css";

function Ranking ({jamData}){
	return (
	<div style={{width:"100%"}}>
		<div className="view">
			<h1>Ranking</h1>
			<div className="table-wrapper">
			<table>
				<Header jamData={jamData}/>
				<tbody>
					{Object.entries(jamData.jam_games).map(([id, entry]) => (
						<tr key={id}>
							<td>#{entry.rank}</td>
							<td>
								<a href={entry.url} target="_blank" rel="noopener noreferrer">{entry.title}</a>
							</td>
							{entry.criteria.slice(0, jamData.criteria.length + 1).map((criteria, index) => (
								<td key={index}>{criteria.score.toFixed(2)}</td>
							))}
							<td>{entry.ratings_given}</td>
							<td>{entry.rating_count}</td>
							<td>{entry.karma}</td>
						</tr>
					))}
				</tbody>
			</table>
			</div>
		</div>
	</div>
	);
}

function Header({jamData}){
	return(
		<thead>
			<tr>
				<th>Rank</th>
				<th>Title</th>
				{jamData.criteria.map((criteria, index) => (
					<th key={index}>{criteria}</th>
				))}
				<th>Overall</th>
				<th>Ratings given</th>
				<th>Ratings received</th>
				<th>Karma</th>
			</tr>
		</thead>
	);
}

export default Ranking;