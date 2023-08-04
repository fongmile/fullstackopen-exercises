import { useState } from 'react'

const Statistics = (props) => {
	const {good,neutral,bad} = props;
	if(good>0 || neutral>0 || bad>0) {
		return (
			<table>
				<tbody>
					<StatisticLine text="good" value ={good} />
					<StatisticLine text="neutral" value ={neutral} />
					<StatisticLine text="bad" value ={bad} />
					<StatisticLine text="all" value ={good + neutral + bad} />
					<StatisticLine text="average" value ={(good >0 || bad >0) ? (good - bad) /  (good+neutral+bad):'0'} />
					<StatisticLine text="positive" value ={(good >0) ? good / (good+neutral+bad)*100 + ' %' :'0 %'} />
				</tbody>
			</table>
		)
	}
	return <div>No feedback given</div>
}

const StatisticLine = (props) => {
	return <tr><td>{props.text}</td><td>{props.value}</td></tr>
}

const App = () => {
	// save clicks of each button to its own state
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);
	
	return (
		<div>
			<h2>give feedback</h2>
			<button onClick={() => {setGood(good+1)}}>good</button> 
			<button onClick={() => {setNeutral(neutral+1)}}>neutral</button> 
			<button onClick={() => {setBad(bad+1)}}>bad</button> 
			
			<h2>statistics</h2>
			<Statistics good={good} neutral={neutral} bad={bad} />

		</div>
	)
}

export default App