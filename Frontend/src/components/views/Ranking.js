import React from "react";
import "./View.css";

function Ranking ({entries, results}){
	return (
	<div style={{width:"100%"}}>
		<div className="view">
			<h1>Ranking</h1>
			<table>
				<Header results={results}/>
				{results.map(entry => (
				<tr>
					<td>#{entry.rank}</td>
					<td>{entry.title}</td>
					<td>{entry.score.toFixed(2)}</td>
					{entry.criteria.map(criteria => (
						<td>{criteria.score.toFixed(2)}</td>
					))}
					<td>0</td>
					<td>{entry.rating_count}</td>
					<td>5.67</td>
				</tr>
				))}
			</table>
		</div>
	</div>
	);
}

function Header({results}){

	return(
		<tr>
			<th>Rank</th>
			<th>Title</th>
			<th>Overall</th>
			{results[0].criteria.map(criteria => (
				<th>{criteria.name}</th>
			))}
			<th>Ratings given</th>
			<th>Ratings received</th>
			<th>Karma</th>
		</tr>
	);
}

export default Ranking;