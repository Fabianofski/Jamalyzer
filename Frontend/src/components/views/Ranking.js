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
					{Object.entries(jamData.rankings.Overall).map(([rank, ids]) => {
						return(
							ids.map((id) => {
								const entry = jamData.jam_games[id];
								return(
									<tr key={id}>
										<td>#{rank}</td>
										<td>
											<a href={entry.jamPageUrl} target="_blank" rel="noopener noreferrer">{entry.title}</a>
										</td>
										{jamData.criteria.map((criteria, index) => {
                      const crit = entry.criteria.find(c => c.name == criteria);
											if (crit)
												return (<td key={index}>{crit.score.toFixed(2)}</td>);
                      else 
                        return (<td key={index}>-</td>);
										})}
										<td>{entry.ratings_given}</td>
										<td>{entry.rating_count}</td>
										<td>{entry.karma}</td>
									</tr>
								);
							})
						);
					})}
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
				<th>Ratings given</th>
				<th>Ratings received</th>
				<th>Karma</th>
			</tr>
		</thead>
	);
}

export default Ranking;