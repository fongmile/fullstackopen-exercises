import { useState, useEffect } from 'react'
import countriesService from './services/countries'

const SearchResult = ({result,clickHandler}) => {
	if(result.length===0) {
		return null;
	}
	if(result.length>10)	{
		return <div>Too many matches, specify another filter</div>
	}
	if(result.length>1) {
		return (
			<div>
			{result.map((x)=>
				<div key={x.cca2}>{x.name.common} <button onClick={()=>clickHandler(x.cca2)}>show</button></div>
			)}
			</div>
		)
	}
	if(result.length===1)	{
		return <CountryDetails country={result[0]} />	
	}
	return null;

}
const CountryDetails = ({country}) => {
	const [weather, setWeather] = useState(null);

	//const country = prop.country[0];
	const languages = Object.entries(country.languages);
	const lat = country.capitalInfo.latlng[0];
	const lon = country.capitalInfo.latlng[1];


	useEffect(()=>	{
		countriesService
			.getWeather(lat,lon)
			.then((res)=>{
				console.log('weather api called');
				setWeather(res);
			})
			.catch((err)=> {
				console.log('get weather error: ', err);
			})
	},[lat,lon]) 

	
	return (
		<div>
			<h1>{country.name.common}</h1>
			<div>capital {country.capital.join(',')}</div>
			<div>area {country.area}</div>
			<h3>languages:</h3>
			<ul>
				{languages.map((a)=> <li key={a[0]}>{a[1]}</li>)}
			</ul>
			<p>
				<img src={country.flags.png} alt={country.flags.alt} />
			</p>
			<WeatherInfo capital={country.capital[0]} weather={weather} />
		</div>
	)	
}
const WeatherInfo = ({capital, weather}) => {
	if(weather===null)	return null;

	return (
		<div>
			<h2>Weather in {capital}</h2>
			<p>temperature {weather.currentConditions.temp} Celcius</p>
			<p><img src={'/weathericon/' + weather.currentConditions.icon + '.png'} alt={weather.currentConditions.conditions} /> </p>
			<p>wind {weather.currentConditions.windspeed} kph</p>

		</div>
	)
}

const App = () => {
	const [countries, setCountries] = useState([]);
	const [searchWord, setSearchWord] = useState('');
	const [searchResult, setSearchResult] = useState([]);

	useEffect(()=>	{
		countriesService.getAllCountries().then(x=>setCountries(x));
	},[])

	const searchCountry = (e) => {
		const keyword = e.target.value;
		setSearchWord(keyword);
		
		setSearchResult(countries.filter((a)=> 
			a.name.common.toLowerCase().includes(keyword.toLowerCase())
		));

	}

	const showCountry = (cca) => {
		const thisCountry = searchResult.filter((a)=>a.cca2===cca);
		setSearchResult(thisCountry);
		setSearchWord(thisCountry[0].name.common);
	}
	
	return (
		<div>
			find countries <input type="text" value={searchWord} onChange={(searchCountry)} />

			<SearchResult result={searchResult} clickHandler={showCountry} />
			
		</div>
	)
}

export default App

/*
<p>--check--</p>
			{countries.map((x)=>
				<div key={x.cca2} >{x.cca2}</div>
			)}
*/
